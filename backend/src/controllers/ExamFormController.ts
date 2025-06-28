
import { Request, Response } from 'express';
import { ExamFormService } from '../services/ExamFormService';

export class ExamFormController {
  constructor(private examFormService: ExamFormService) {}

  async getAllExamForms(req: Request, res: Response): Promise<void> {
    try {
      const examForms = await this.examFormService.getAllExamForms();
      res.json(examForms);
    } catch (error) {
      console.error('Get exam forms error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getExamFormById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const examForm = await this.examFormService.getExamFormById(id);
      
      if (!examForm) {
        res.status(404).json({ message: 'Exam form not found' });
        return;
      }
      
      res.json(examForm);
    } catch (error) {
      console.error('Get exam form error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getExamFormsByPatientId(req: Request, res: Response): Promise<void> {
    try {
      const patientId = parseInt(req.params.patientId);
      const examForms = await this.examFormService.getExamFormsByPatientId(patientId);
      res.json(examForms);
    } catch (error) {
      console.error('Get patient exam forms error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createExamForm(req: Request, res: Response): Promise<void> {
    try {
      const examForm = await this.examFormService.createExamForm(req.body);
      res.json(examForm);
    } catch (error) {
      console.error('Create exam form error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updatePatientInfo(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const patientInfo = await this.examFormService.updatePatientInfo(id, req.body);
      res.json(patientInfo);
    } catch (error) {
      console.error('Update patient info error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateVisualAcuity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const visualAcuity = await this.examFormService.updateVisualAcuity(id, req.body);
      res.json(visualAcuity);
    } catch (error) {
      console.error('Update visual acuity error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateRefraction(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const refraction = await this.examFormService.updateRefraction(id, req.body);
      res.json(refraction);
    } catch (error) {
      console.error('Update refraction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateDiagnosis(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const diagnosis = await this.examFormService.updateDiagnosis(id, req.body);
      res.json(diagnosis);
    } catch (error) {
      console.error('Update diagnosis error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
