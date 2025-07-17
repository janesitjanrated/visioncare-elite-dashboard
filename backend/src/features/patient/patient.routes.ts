import { Router } from 'express';
import * as patientController from './patient.controller';
import * as prescriptionController from '../prescription/prescription.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { orgContext } from '../../middlewares/orgContext';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

// Apply authentication and organization context middleware to all routes
router.use(jwtAuth, orgContext);

// Patient management endpoints
router.get('/', rbacGuard(['patient:read']), patientController.getPatients);
router.post('/', rbacGuard(['patient:create']), patientController.createPatient);
router.get('/:id', rbacGuard(['patient:read']), patientController.getPatientById);
router.patch('/:id', rbacGuard(['patient:update']), patientController.updatePatient);
router.delete('/:id', rbacGuard(['patient:delete']), patientController.deletePatient);

// Insurance endpoints (currently returning 501 Not Implemented)
router.get('/:id/insurance', rbacGuard(['insurance:read']), patientController.getPatientInsurance);

// Prescription endpoints (using dedicated prescription controller)
router.get('/:id/prescriptions', rbacGuard(['prescription:read']), 
  async (req, res) => {
    if (!(req as any).org_id) {
      return res.status(400).json({ 
        success: false, 
        error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } 
      });
    }
    
    const { id } = req.params;
    req.query.patient_id = id;
    return prescriptionController.getPrescriptions(req, res);
  }
);

router.post('/:id/prescriptions', rbacGuard(['prescription:create']), 
  async (req, res) => {
    if (!(req as any).org_id) {
      return res.status(400).json({ 
        success: false, 
        error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } 
      });
    }
    
    const { id } = req.params;
    req.body.patient_id = id;
    return prescriptionController.createPrescription(req, res);
  }
);

// Search and filter endpoints
router.get('/search', rbacGuard(['patient:read']), patientController.searchPatients);
router.get('/filters', rbacGuard(['patient:read']), patientController.getFilterOptions);

export default router;
