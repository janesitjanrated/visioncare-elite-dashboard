export interface Patient {
  id: number;
  patientId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date_of_birth: Date;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive';
  lastVisit?: Date;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insurance {
  id: number;
  patientId: number;
  provider: string;
  policyNumber: string;
  groupNumber: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: number;
  patientId: number;
  date: Date;
  type: string;
  rightEye: {
    sphere: string;
    cylinder: string;
    axis: string;
  };
  leftEye: {
    sphere: string;
    cylinder: string;
    axis: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientFilters {
  status?: string;
  visitFrequency?: string;
  prescriptionType?: string;
  insurance?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
