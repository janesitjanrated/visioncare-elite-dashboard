
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { Appointment, AppointmentCreateRequest, AppointmentUpdateRequest } from '../models/Appointment';

export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.findAll();
  }

  async createAppointment(appointmentData: AppointmentCreateRequest): Promise<Appointment> {
    return await this.appointmentRepository.create(appointmentData);
  }

  async updateAppointment(id: number, appointmentData: AppointmentUpdateRequest): Promise<Appointment | null> {
    return await this.appointmentRepository.update(id, appointmentData);
  }
}
