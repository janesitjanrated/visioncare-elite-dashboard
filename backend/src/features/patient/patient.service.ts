import { Knex } from 'knex';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';
import { 
  Patient, 
  PatientFilters, 
  CreatePatientDTO, 
  UpdatePatientDTO,
  PatientNotFoundError,
  DuplicatePatientError,
  PatientWithOrganization
} from './patient.model';

function basePatientQuery(org_id: string, filters: Partial<PatientFilters> = {}) {
  const query = db<Patient>('patients')
    .where({ org_id, deleted_at: null });

  if (filters.branch_id) {
    query.where('branch_id', filters.branch_id);
  }

  if (filters.status) {
    query.where('status', filters.status);
  }

  if (filters.search) {
    query.where(builder => {
      builder
        .whereILike('first_name', `%${filters.search}%`)
        .orWhereILike('last_name', `%${filters.search}%`)
        .orWhereILike('email', `%${filters.search}%`)
        .orWhereILike('phone', `%${filters.search}%`);
    });
  } else {
    if (filters.first_name) {
      query.whereILike('first_name', `%${filters.first_name}%`);
    }
    if (filters.last_name) {
      query.whereILike('last_name', `%${filters.last_name}%`);
    }
    if (filters.email) {
      query.whereILike('email', `%${filters.email}%`);
    }
    if (filters.phone) {
      query.whereILike('phone', `%${filters.phone}%`);
    }
  }

  if (filters.dateOfBirthFrom) {
    query.where('date_of_birth', '>=', filters.dateOfBirthFrom);
  }
  if (filters.dateOfBirthTo) {
    query.where('date_of_birth', '<=', filters.dateOfBirthTo);
  }

  if (filters.insurance_provider) {
    query.where('insurance_provider', filters.insurance_provider);
  }

  return query;
}

function convertDates(patient: Patient): Patient {
  return {
    ...patient,
    created_at: new Date(patient.created_at).toISOString(),
    updated_at: new Date(patient.updated_at).toISOString(),
    deleted_at: patient.deleted_at ? new Date(patient.deleted_at).toISOString() : null
  };
}

export async function getPatients(org_id: string, filters: PatientFilters = { org_id }): Promise<Patient[]> {
  try {
    const patients = await basePatientQuery(org_id, filters)
      .orderBy('created_at', 'desc');
    return patients.map(convertDates);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw new Error('Failed to fetch patients');
  }
}

export async function getPatientsWithOrganization(org_id: string, filters: PatientFilters = { org_id }): Promise<PatientWithOrganization[]> {
  try {
    const patients = await basePatientQuery(org_id, filters)
      .leftJoin('organization', 'patients.org_id', 'organization.id')
      .select('patients.*', 'organization.name as organization_name')
      .orderBy('patients.created_at', 'desc');

    return patients.map(patient => ({
      ...convertDates(patient),
      organization: {
        id: patient.org_id,
        name: patient.organization_name,
        status: 'active', // TODO: Include actual org status
        created_at: patient.created_at,
        updated_at: patient.updated_at,
        deleted_at: null
      }
    }));
  } catch (error) {
    console.error('Failed to fetch patients with organization:', error);
    throw new Error('Failed to fetch patients');
  }
}

export async function getPatientById(org_id: string, id: string): Promise<Patient | null> {
  try {
    const patient = await basePatientQuery(org_id)
      .where('patients.id', id)
      .first();
    return patient ? convertDates(patient) : null;
  } catch (error) {
    console.error(`Failed to fetch patient ${id}:`, error);
    throw new Error('Failed to fetch patient');
  }
}

export async function createPatient(data: CreatePatientDTO, user_id: string): Promise<Patient> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      // Check for duplicate email if provided
      if (data.email) {
        const existing = await trx<Patient>('patients')
          .where({ 
            org_id: data.org_id, 
            email: data.email,
            deleted_at: null 
          })
          .first();
        
        if (existing) {
          throw new DuplicatePatientError(`Patient with email ${data.email} already exists`);
        }
      }

      const now = trx.fn.now();
      const [patient] = await trx<Patient>('patients')
        .insert({
          ...data,
          created_at: now,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(patient);
      await logAudit('create', 'patient', null, converted, { org_id: data.org_id, user_id });
      return converted;
    });
  } catch (error) {
    if (error instanceof DuplicatePatientError) {
      throw error;
    }
    console.error('Failed to create patient:', error);
    throw new Error('Failed to create patient');
  }
}

export async function updatePatient(org_id: string, id: string, data: UpdatePatientDTO, user_id: string): Promise<Patient> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Patient>('patients')
        .where({ org_id, id, deleted_at: null })
        .first();

      if (!before) {
        throw new PatientNotFoundError(id, org_id);
      }

      // Check for duplicate email if being updated
      if (data.email && data.email !== before.email) {
        const existing = await trx<Patient>('patients')
          .where({ 
            org_id,
            email: data.email,
            deleted_at: null 
          })
          .whereNot('id', id)
          .first();
        
        if (existing) {
          throw new DuplicatePatientError(`Patient with email ${data.email} already exists`);
        }
      }

      const now = trx.fn.now();
      const [after] = await trx<Patient>('patients')
        .where({ id })
        .update({
          ...data,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(after);
      await logAudit('update', 'patient', before, converted, { org_id, user_id });
      return converted;
    });
  } catch (error) {
    if (error instanceof PatientNotFoundError || error instanceof DuplicatePatientError) {
      throw error;
    }
    console.error(`Failed to update patient ${id}:`, error);
    throw new Error('Failed to update patient');
  }
}

export async function deletePatient(org_id: string, id: string, user_id: string): Promise<boolean> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Patient>('patients')
        .where({ org_id, id, deleted_at: null })
        .first();

      if (!before) {
        throw new PatientNotFoundError(id, org_id);
      }

      const now = trx.fn.now();
      await trx('patients')
        .where({ id })
        .update({ 
          deleted_at: now,
          updated_at: now
        });

      await logAudit('delete', 'patient', before, null, { org_id, user_id });
      return true;
    });
  } catch (error) {
    if (error instanceof PatientNotFoundError) {
      throw error;
    }
    console.error(`Failed to delete patient ${id}:`, error);
    throw new Error('Failed to delete patient');
  }
}
