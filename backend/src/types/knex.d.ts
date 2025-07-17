import { Knex } from 'knex';

interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

interface Appointment extends BaseEntity {
  patient_id: string;
  org_id: string;
  branch_id: string;
  staff_id: string;
  date: Date;
  start_time: string;
  end_time: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
}

interface Branch extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  working_hours: string;
  org_id: string;
}

interface Organization extends BaseEntity {
  name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  tax_id?: string;
  logo_url?: string;
  settings: Record<string, any>;
}

interface Patient extends BaseEntity {
  org_id: string;
  branch_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: Date;
  gender?: 'male' | 'female' | 'other';
  blood_type?: string;
  allergies?: string[];
  medical_conditions?: string[];
  insurance_provider?: string;
  insurance_id?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  photo_url?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'archived';
}

interface Prescription extends BaseEntity {
  patient_id: string;
  org_id: string;
  staff_id: string;
  appointment_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface Staff extends BaseEntity {
  org_id: string;
  branch_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
  specialization?: string;
  photo_url?: string;
  schedule?: Record<string, any>;
  status: 'active' | 'inactive';
  permissions: string[];
}

declare module 'knex/types/tables' {
  interface Tables {
    appointment: Appointment;
    branch: Branch;
    organization: Organization;
    patient: Patient;
    prescription: Prescription;
    staff: Staff;
  }
}
