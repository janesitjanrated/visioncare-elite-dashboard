import { Patient } from '../patient/patient.model';

export interface Prescription {
  id: string;
  org_id: string;
  branch_id: string;
  patient_id: string;
  staff_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  status: 'active' | 'completed' | 'cancelled';
  notes: string | null;
  date: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PrescriptionFilters {
  org_id: string;
  branch_id?: string;
  patient_id?: string;
  staff_id?: string;
  status?: Prescription['status'];
  dateFrom?: string;
  dateTo?: string;
}

export interface CreatePrescriptionDTO extends 
  Pick<Prescription, 'org_id' | 'branch_id' | 'patient_id' | 'staff_id' | 'medication' | 'dosage' | 'frequency' | 'duration' | 'status'>,
  Partial<Pick<Prescription, 'instructions' | 'notes' | 'data' | 'date'>> {}

export type UpdatePrescriptionDTO = Partial<Omit<CreatePrescriptionDTO, 'org_id' | 'branch_id' | 'patient_id' | 'staff_id'>>;

export class PrescriptionNotFoundError extends Error {
  constructor(id: string, org_id: string) {
    super(`Prescription with id ${id} not found in organization ${org_id}`);
    this.name = 'PrescriptionNotFoundError';
  }
}

export interface PrescriptionWithPatient extends Prescription {
  patient: Patient;
}

export interface PrescriptionStats {
  total: number;
  active: number;
  completed: number;
  cancelled: number;
  by_medication: {
    medication: string;
    count: number;
  }[];
  by_status: {
    status: Prescription['status'];
    count: number;
  }[];
}