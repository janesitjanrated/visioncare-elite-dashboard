import { Request, Response } from 'express';
import * as patientService from './patient.service';
import * as prescriptionService from '../prescription/prescription.service';
import { PatientFilters } from './patient.model';
import { patientCreateSchema, patientUpdateSchema } from './patient.validation';

export async function getPatients(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  const filters: PatientFilters = {
    org_id: (req as any).org_id,
    ...req.query as Partial<PatientFilters>
  };

  try {
    const patients = await patientService.getPatients((req as any).org_id, filters);
    res.json({ success: true, data: { patients } });
  } catch (error) {
    console.error('Error getting patients:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch patients' }
    });
  }
}

export async function getPatientById(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  const { id } = req.params;
  const patient = await patientService.getPatientById((req as any).org_id, id);
  if (!patient) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Patient not found' }
    });
  }
  res.json({ success: true, data: patient });
}

export async function createPatient(req: Request, res: Response) {
  if (!(req as any).org_id || !(req as any).user?.id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_DATA', message: 'Organization ID and User ID are required' }
    });
  }

  const { error } = patientCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: error.message, field: error.details[0]?.path[0] }
    });
  }

  try {
    const patientData = {
      ...req.body,
      org_id: (req as any).org_id
    };
    const patient = await patientService.createPatient(patientData, (req as any).user.id);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create patient' }
    });
  }
}

export async function updatePatient(req: Request, res: Response) {
  if (!(req as any).org_id || !(req as any).user?.id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_DATA', message: 'Organization ID and User ID are required' }
    });
  }

  const { id } = req.params;
  const { error } = patientUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: error.message, field: error.details[0]?.path[0] }
    });
  }

  const patient = await patientService.updatePatient((req as any).org_id, id, req.body, (req as any).user.id);
  if (!patient) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Patient not found' }
    });
  }
  res.json({ success: true, data: patient });
}

export async function deletePatient(req: Request, res: Response) {
  if (!(req as any).org_id || !(req as any).user?.id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_DATA', message: 'Organization ID and User ID are required' }
    });
  }

  const { id } = req.params;
  const ok = await patientService.deletePatient((req as any).org_id, id, (req as any).user.id);
  if (!ok) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Patient not found' }
    });
  }
  res.status(204).send();
}

// Insurance endpoints
export async function getPatientInsurance(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  const { id } = req.params;
  try {
    // This should be handled by a separate insurance service
    return res.status(501).json({
      success: false,
      error: { code: 'NOT_IMPLEMENTED', message: 'Patient insurance features not implemented' }
    });
  } catch (error) {
    console.error('Error getting patient insurance:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch patient insurance' }
    });
  }
}

// Prescription endpoints
export async function getPatientPrescriptions(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  const { id } = req.params;
  try {
    const prescriptions = await prescriptionService.getPrescriptions((req as any).org_id, { 
      org_id: (req as any).org_id,
      patient_id: id
    });
    res.json({ success: true, data: { prescriptions } });
  } catch (error) {
    console.error('Error getting patient prescriptions:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch patient prescriptions' }
    });
  }
}

// Use the existing getPatients with search functionality instead of a separate search endpoint
export async function searchPatients(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  const { query } = req.query;
  try {
    const filters: PatientFilters = {
      org_id: (req as any).org_id,
      search: query as string
    };
    const patients = await patientService.getPatients((req as any).org_id, filters);
    res.json({ success: true, data: { patients } });
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to search patients' }
    });
  }
}

// Return static filter options instead of fetching from DB
export async function getFilterOptions(req: Request, res: Response) {
  if (!(req as any).org_id) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_ORG', message: 'Organization ID is required' }
    });
  }

  // Return static filter options
  res.json({
    success: true,
    data: {
      status: ['active', 'inactive', 'archived'],
      gender: ['male', 'female', 'other'],
      blood_type: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    }
  });
}
