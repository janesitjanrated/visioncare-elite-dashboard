
import { Router } from 'express';
import { PatientController } from '../controllers/PatientController';
import { PatientService } from '../services/PatientService';
import { PatientRepository } from '../repositories/PatientRepository';
import { pool } from '../config/database';

const router = Router();

// Initialize dependencies
const patientRepository = new PatientRepository(pool);
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

router.get('/', (req, res) => patientController.getAllPatients(req, res));
router.post('/', (req, res) => patientController.createPatient(req, res));
router.put('/:id', (req, res) => patientController.updatePatient(req, res));
router.delete('/:id', (req, res) => patientController.deletePatient(req, res));

export default router;
