import db from '../../config/db';
import { Organization } from '../organization/organization.model';

export interface Patient {
  id: string;
  org_id: string;
  branch_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | null;
  allergies: string[];
  medical_conditions: string[];
  insurance_provider: string | null;
  insurance_id: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  photo_url: string | null;
  notes: string | null;
  status: 'active' | 'inactive' | 'archived';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PatientFilters {
  org_id: string;
  branch_id?: string;
  search?: string;
  status?: Patient['status'];
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  insurance_provider?: string;
}

export interface CreatePatientDTO extends 
  Pick<Patient, 'org_id' | 'branch_id' | 'first_name' | 'last_name' | 'status'>,
  Partial<Omit<Patient, 
    'id' | 'org_id' | 'branch_id' | 'first_name' | 'last_name' | 'status' | 
    'created_at' | 'updated_at' | 'deleted_at'
  >> {}

export type UpdatePatientDTO = Partial<Omit<CreatePatientDTO, 'org_id' | 'branch_id'>>;

export class PatientNotFoundError extends Error {
  constructor(id: string, org_id: string) {
    super(`Patient with id ${id} not found in organization ${org_id}`);
    this.name = 'PatientNotFoundError';
  }
}

export class DuplicatePatientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatePatientError';
  }
}

export interface PatientWithOrganization extends Patient {
  organization: Organization;
}

/**
 * Create a new patient
 * @param patientData - Patient data
 * @returns Created patient
 */
export async function createPatient(patientData: Omit<Patient, 'id'>): Promise<Patient> {
  const [patient] = await db<Patient>('patients')
    .insert(patientData)
    .returning('*');
  return patient;
}

/**
 * Get all patients
 * @returns List of patients
 */
export async function getAllPatients(): Promise<Patient[]> {
  return db<Patient>('patients')
    .whereNull('deleted_at')
    .orderBy('id', 'desc');
}

/**
 * Get a patient by ID
 * @param id - Patient ID
 * @returns Patient or null if not found
 */
export async function getPatientById(id: string): Promise<Patient | null> {
  const patient = await db<Patient>('patients')
    .where({ id })
    .whereNull('deleted_at')
    .first();
  return patient || null;
}

/**
 * Delete a patient by ID
 * @param patientId - Patient ID
 */
export async function deletePatient(patientId: string): Promise<void> {
  await db<Patient>('patients')
    .where({ id: patientId })
    .update({ deleted_at: db.fn.now() });
}
