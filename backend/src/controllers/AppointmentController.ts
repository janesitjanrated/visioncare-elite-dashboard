
import { Request, Response } from 'express';
import { AppointmentService } from '../services/AppointmentService';

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await this.appointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      console.error('Get appointments error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await this.appointmentService.createAppointment(req.body);
      res.json(appointment);
    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const appointment = await this.appointmentService.updateAppointment(id, req.body);
      
      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }
      
      res.json(appointment);
    } catch (error) {
      console.error('Update appointment error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
