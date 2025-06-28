
import { PatientRepository } from '../repositories/PatientRepository';
import { Patient, PatientCreateRequest, PatientUpdateRequest } from '../models/Patient';

export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  async getAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return await this.patientRepository.findById(id);
  }

  async createPatient(patientData: PatientCreateRequest): Promise<Patient> {
    return await this.patientRepository.create(patientData);
  }

  async updatePatient(id: number, patientData: PatientUpdateRequest): Promise<Patient | null> {
    return await this.patientRepository.update(id, patientData);
  }

  async deletePatient(id: number): Promise<boolean> {
    return await this.patientRepository.delete(id);
  }
}
