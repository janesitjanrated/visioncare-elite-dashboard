
export interface Appointment {
  id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time?: string;
  notes: string;
  status: string;
  queue_number?: number;
  chief_complaint?: string;
  created_at?: Date;
  updated_at?: Date;
  patient_name?: string;
  patient_phone?: string;
  // Relations
  patients?: {
    name: string;
    full_name?: string;
    phone?: string;
  };
  branches?: {
    name: string;
  };
}

export interface AppointmentCreateRequest {
  patient_id: number;
  appointment_date: string;
  appointment_time?: string;
  notes: string;
  status: string;
  queue_number?: number;
  chief_complaint?: string;
}

export interface AppointmentUpdateRequest extends AppointmentCreateRequest {
  id: number;
}
