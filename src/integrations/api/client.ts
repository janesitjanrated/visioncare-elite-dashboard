const API_BASE_URL = 'http://localhost:3001/api';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  patient_id: number;
  appointment_date: string;
  notes: string;
  status: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request('/health');
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  // Patients
  async getPatients(): Promise<Patient[]> {
    return this.request('/patients');
  }

  async createPatient(patientData: Omit<Patient, 'id' | 'created_at'>): Promise<Patient> {
    return this.request('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return this.request('/appointments');
  }

  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment> {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }
}

export const apiClient = new ApiClient(); 