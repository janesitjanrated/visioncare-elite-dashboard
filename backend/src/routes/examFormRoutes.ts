
import { Router } from 'express';
import { ExamFormController } from '../controllers/ExamFormController';
import { ExamFormService } from '../services/ExamFormService';
import { ExamFormRepository } from '../repositories/ExamFormRepository';
import { pool } from '../config/database';

const router = Router();

// Initialize dependencies
const examFormRepository = new ExamFormRepository(pool);
const examFormService = new ExamFormService(examFormRepository);
const examFormController = new ExamFormController(examFormService);

router.get('/', (req, res) => examFormController.getAllExamForms(req, res));
router.get('/:id', (req, res) => examFormController.getExamFormById(req, res));
router.get('/patient/:patientId', (req, res) => examFormController.getExamFormsByPatientId(req, res));
router.post('/', (req, res) => examFormController.createExamForm(req, res));
router.post('/:id/patient-info', (req, res) => examFormController.updatePatientInfo(req, res));
router.post('/:id/visual-acuity', (req, res) => examFormController.updateVisualAcuity(req, res));
router.post('/:id/refraction', (req, res) => examFormController.updateRefraction(req, res));
router.post('/:id/diagnosis', (req, res) => examFormController.updateDiagnosis(req, res));

export default router;
