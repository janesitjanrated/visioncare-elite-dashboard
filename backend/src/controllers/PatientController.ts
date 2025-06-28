
import { Request, Response } from 'express';
import { PatientService } from '../services/PatientService';

export class PatientController {
  constructor(private patientService: PatientService) {}

  async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.patientService.getAllPatients();
      res.json(patients);
    } catch (error) {
      console.error('Get patients error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.patientService.createPatient(req.body);
      res.json(patient);
    } catch (error) {
      console.error('Create patient error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const patient = await this.patientService.updatePatient(id, req.body);
      
      if (!patient) {
        res.status(404).json({ message: 'Patient not found' });
        return;
      }
      
      res.json(patient);
    } catch (error) {
      console.error('Update patient error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.patientService.deletePatient(id);
      
      if (!deleted) {
        res.status(404).json({ message: 'Patient not found' });
        return;
      }
      
      res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Delete patient error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
