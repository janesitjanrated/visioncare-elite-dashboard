import { Knex } from 'knex';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';
import {
  Prescription,
  PrescriptionFilters,
  CreatePrescriptionDTO,
  UpdatePrescriptionDTO,
  PrescriptionNotFoundError,
  PrescriptionWithPatient,
  PrescriptionStats
} from './prescription.model';
import { PatientNotFoundError } from '../patient/patient.model';

function basePrescriptionQuery(org_id: string, filters: Partial<PrescriptionFilters> = {}) {
  const query = db<Prescription>('prescriptions')
    .where({ org_id, deleted_at: null });

  if (filters.branch_id) {
    query.where('branch_id', filters.branch_id);
  }

  if (filters.patient_id) {
    query.where('patient_id', filters.patient_id);
  }

  if (filters.staff_id) {
    query.where('staff_id', filters.staff_id);
  }

  if (filters.status) {
    query.where('status', filters.status);
  }

  if (filters.dateFrom) {
    query.where('date', '>=', filters.dateFrom);
  }

  if (filters.dateTo) {
    query.where('date', '<=', filters.dateTo);
  }

  return query;
}

function convertDates(prescription: Prescription): Prescription {
  return {
    ...prescription,
    created_at: new Date(prescription.created_at).toISOString(),
    updated_at: new Date(prescription.updated_at).toISOString(),
    deleted_at: prescription.deleted_at ? new Date(prescription.deleted_at).toISOString() : null,
    date: prescription.date ? new Date(prescription.date).toISOString() : new Date().toISOString()
  };
}

export async function getPrescriptions(org_id: string, filters: PrescriptionFilters = { org_id }): Promise<Prescription[]> {
  try {
    const prescriptions = await basePrescriptionQuery(org_id, filters)
      .orderBy('created_at', 'desc');
    return prescriptions.map(convertDates);
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    throw new Error('Failed to fetch prescriptions');
  }
}

export async function getPrescriptionsWithPatient(org_id: string, filters: PrescriptionFilters = { org_id }): Promise<PrescriptionWithPatient[]> {
  try {
    const prescriptions = await basePrescriptionQuery(org_id, filters)
      .leftJoin('patients', 'prescriptions.patient_id', 'patients.id')
      .select(
        'prescriptions.*',
        'patients.first_name',
        'patients.last_name',
        'patients.email',
        'patients.phone'
      )
      .orderBy('prescriptions.created_at', 'desc');

    return prescriptions.map(prescription => ({
      ...convertDates(prescription),
      patient: {
        id: prescription.patient_id,
        first_name: prescription.first_name,
        last_name: prescription.last_name,
        email: prescription.email,
        phone: prescription.phone,
        org_id: prescription.org_id
      } as any // TODO: Complete patient type
    }));
  } catch (error) {
    console.error('Failed to fetch prescriptions with patient:', error);
    throw new Error('Failed to fetch prescriptions');
  }
}

export async function getPrescriptionById(org_id: string, id: string): Promise<Prescription | null> {
  try {
    const prescription = await basePrescriptionQuery(org_id)
      .where('prescriptions.id', id)
      .first();
    return prescription ? convertDates(prescription) : null;
  } catch (error) {
    console.error(`Failed to fetch prescription ${id}:`, error);
    throw new Error('Failed to fetch prescription');
  }
}

export async function getPrescriptionStats(org_id: string, filters: PrescriptionFilters = { org_id }): Promise<PrescriptionStats> {
  try {
    const baseQuery = basePrescriptionQuery(org_id, filters);

    const [
      totalResult,
      statusCounts,
      medicationCounts
    ] = await Promise.all([
      baseQuery.clone()
        .count<[{ count: number }]>('* as count')
        .first(),
      baseQuery.clone()
        .select('status')
        .count<Array<{ status: Prescription['status']; count: number }>>('* as count')
        .groupBy('status'),
      baseQuery.clone()
        .select('medication')
        .count<Array<{ medication: string; count: number }>>('* as count')
        .groupBy('medication')
        .orderBy('count', 'desc')
        .limit(10)
    ]);

    const stats: PrescriptionStats = {
      total: Number(totalResult?.count || 0),
      active: 0,
      completed: 0,
      cancelled: 0,
      by_status: statusCounts.map(s => ({ 
        status: s.status,
        count: Number(s.count)
      })),
      by_medication: medicationCounts.map(m => ({
        medication: m.medication,
        count: Number(m.count)
      }))
    };

    // Update status counts
    stats.by_status.forEach(s => {
      stats[s.status] = s.count;
    });

    return stats;
  } catch (error) {
    console.error('Failed to fetch prescription stats:', error);
    throw new Error('Failed to fetch prescription stats');
  }
}

export async function createPrescription(data: CreatePrescriptionDTO, user_id: string): Promise<Prescription> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      // Verify patient exists
      const patient = await trx('patients')
        .where({ 
          id: data.patient_id,
          org_id: data.org_id,
          deleted_at: null 
        })
        .first();

      if (!patient) {
        throw new PatientNotFoundError(data.patient_id, data.org_id);
      }

      const now = trx.fn.now();
      const [prescription] = await trx<Prescription>('prescriptions')
        .insert({
          ...data,
          date: data.date || now,
          created_at: now,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(prescription);
      await logAudit('create', 'prescription', null, converted, { org_id: data.org_id, user_id });
      return converted;
    });
  } catch (error) {
    if (error instanceof PatientNotFoundError) {
      throw error;
    }
    console.error('Failed to create prescription:', error);
    throw new Error('Failed to create prescription');
  }
}

export async function updatePrescription(org_id: string, id: string, data: UpdatePrescriptionDTO, user_id: string): Promise<Prescription> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Prescription>('prescriptions')
        .where({ org_id, id, deleted_at: null })
        .first();

      if (!before) {
        throw new PrescriptionNotFoundError(id, org_id);
      }

      const now = trx.fn.now();
      const [after] = await trx<Prescription>('prescriptions')
        .where({ id })
        .update({
          ...data,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(after);
      await logAudit('update', 'prescription', before, converted, { org_id, user_id });
      return converted;
    });
  } catch (error) {
    if (error instanceof PrescriptionNotFoundError) {
      throw error;
    }
    console.error(`Failed to update prescription ${id}:`, error);
    throw new Error('Failed to update prescription');
  }
}

export async function deletePrescription(org_id: string, id: string, user_id: string): Promise<boolean> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Prescription>('prescriptions')
        .where({ org_id, id, deleted_at: null })
        .first();

      if (!before) {
        throw new PrescriptionNotFoundError(id, org_id);
      }

      const now = trx.fn.now();
      await trx('prescriptions')
        .where({ id })
        .update({ 
          deleted_at: now,
          updated_at: now
        });

      await logAudit('delete', 'prescription', before, null, { org_id, user_id });
      return true;
    });
  } catch (error) {
    if (error instanceof PrescriptionNotFoundError) {
      throw error;
    }
    console.error(`Failed to delete prescription ${id}:`, error);
    throw new Error('Failed to delete prescription');
  }
}