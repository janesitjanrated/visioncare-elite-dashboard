
import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';
import { AppointmentService } from '../services/AppointmentService';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { pool } from '../config/database';

const router = Router();

// Initialize dependencies
const appointmentRepository = new AppointmentRepository(pool);
const appointmentService = new AppointmentService(appointmentRepository);
const appointmentController = new AppointmentController(appointmentService);

router.get('/', (req, res) => appointmentController.getAllAppointments(req, res));
router.post('/', (req, res) => appointmentController.createAppointment(req, res));
router.put('/:id', (req, res) => appointmentController.updateAppointment(req, res));

export default router;
