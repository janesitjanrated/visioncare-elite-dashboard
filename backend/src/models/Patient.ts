
export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PatientCreateRequest {
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
}

export interface PatientUpdateRequest extends PatientCreateRequest {
  id: number;
}
