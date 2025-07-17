import { Router } from 'express';
import * as prescriptionController from './prescription.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

router.use(jwtAuth);

router.get('/', rbacGuard(['prescription:read']), prescriptionController.getPrescriptions);
router.post('/', rbacGuard(['prescription:create']), prescriptionController.createPrescription);
router.get('/:id', rbacGuard(['prescription:read']), prescriptionController.getPrescriptionById);
router.patch('/:id', rbacGuard(['prescription:update']), prescriptionController.updatePrescription);
router.delete('/:id', rbacGuard(['prescription:delete']), prescriptionController.deletePrescription);

export default router; 