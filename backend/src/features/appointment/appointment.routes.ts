import { Router } from 'express';
import * as appointmentController from './appointment.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

router.use(jwtAuth);

router.get('/', rbacGuard(['appointment:read']), appointmentController.getAppointments);
router.post('/', rbacGuard(['appointment:create']), appointmentController.createAppointment);
router.get('/:id', rbacGuard(['appointment:read']), appointmentController.getAppointmentById);
router.patch('/:id', rbacGuard(['appointment:update']), appointmentController.updateAppointment);
router.delete('/:id', rbacGuard(['appointment:delete']), appointmentController.deleteAppointment);

export default router; 