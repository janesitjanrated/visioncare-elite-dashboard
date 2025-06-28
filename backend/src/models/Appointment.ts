
export interface Appointment {
  id: number;
  patient_id: number;
  appointment_date: string;
  notes: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  patient_name?: string;
  patient_phone?: string;
}

export interface AppointmentCreateRequest {
  patient_id: number;
  appointment_date: string;
  notes: string;
  status: string;
}

export interface AppointmentUpdateRequest extends AppointmentCreateRequest {
  id: number;
}
