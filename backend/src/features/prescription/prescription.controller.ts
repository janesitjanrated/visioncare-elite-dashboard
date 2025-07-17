import { Request, Response } from 'express';
import * as prescriptionService from './prescription.service';
import { PrescriptionFilters } from './prescription.model';
import { prescriptionCreateSchema, prescriptionUpdateSchema } from './prescription.validation';

export async function getPrescriptions(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  try {
    const filters: PrescriptionFilters = {
      org_id: (req as any).org_id,
      ...req.query as Partial<PrescriptionFilters>
    };
    const prescriptions = await prescriptionService.getPrescriptions((req as any).org_id, filters);
    res.json({ success: true, data: { prescriptions } });
  } catch (error) {
    console.error('Error getting prescriptions:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch prescriptions' } 
    });
  }
}

export async function getPrescriptionById(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  try {
    const { id } = req.params;
    const prescription = await prescriptionService.getPrescriptionById((req as any).org_id, id);
    if (!prescription) {
      return res.status(404).json({ 
        success: false, 
        error: { code: 'NOT_FOUND', message: 'Prescription not found' }
      });
    }
    res.json({ success: true, data: prescription });
  } catch (error) {
    console.error('Error getting prescription:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch prescription' } 
    });
  }
}

export async function createPrescription(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!(req as any).user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const { error } = prescriptionCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false, 
      error: { 
        code: 'VALIDATION_ERROR', 
        message: error.message,
        field: error.details[0]?.path[0]
      } 
    });
  }

  try {
    const prescriptionData = {
      ...req.body,
      org_id: (req as any).org_id,
      staff_id: (req as any).user.id
    };
    const prescription = await prescriptionService.createPrescription(prescriptionData, (req as any).user.id);
    res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'SERVER_ERROR', message: 'Failed to create prescription' } 
    });
  }
}

export async function updatePrescription(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!(req as any).user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const org_id = (req as any).org_id;
  const user_id = (req as any).user.id;
  
  const { id } = req.params;
  const { error } = prescriptionUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false, 
      error: { 
        code: 'VALIDATION_ERROR', 
        message: error.message, 
        field: error.details[0]?.path[0] 
      } 
    });
  }

  const prescription = await prescriptionService.updatePrescription(org_id, id, req.body, user_id);
  if (!prescription) {
    return res.status(404).json({ 
      success: false, 
      error: { 
        code: 'NOT_FOUND', 
        message: 'Prescription not found' 
      } 
    });
  }

  res.json({ success: true, data: prescription });
}

export async function deletePrescription(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!(req as any).user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const org_id = (req as any).org_id;
  const user_id = (req as any).user.id;

  const { id } = req.params;
  const ok = await prescriptionService.deletePrescription(org_id, id, user_id);
  if (!ok) {
    return res.status(404).json({ 
      success: false, 
      error: { 
        code: 'NOT_FOUND', 
        message: 'Prescription not found' 
      } 
    });
  }
  
  res.status(204).send();
}