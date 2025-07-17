import { Router } from 'express';
import { LoanController } from '../controllers/LoanController';
import { LoanService } from '../services/LoanService';
import { LoanModel } from '../models/Loan';
import validate from '../../../middlewares/validate';
import { LoanValidator } from '../validators/LoanValidator';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';

const router = Router();
const loanModel = new LoanModel(db);
const loanService = new LoanService(loanModel);
const loanController = new LoanController(loanService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager', 'finance']));

// Loan Application Routes
router.get('/applications', loanController.getAllLoanApplications);
router.get('/applications/:id', loanController.getLoanApplicationById);
router.post('/applications', validate(LoanValidator.createApplication), loanController.createLoanApplication);
router.put('/applications/:id', validate(LoanValidator.updateApplication), loanController.updateLoanApplication);

// Loan Application Status Routes
router.post('/applications/:id/approve', validate(LoanValidator.approve), loanController.approveLoanApplication);
router.post('/applications/:id/reject', validate(LoanValidator.reject), loanController.rejectLoanApplication);

// Active Loans Routes
router.get('/active', loanController.getAllActiveLoans);
router.get('/active/:id', loanController.getLoanById);

// Loan Payments Routes
router.get('/active/:loanId/payments', loanController.getLoanPayments);
router.post('/active/:loanId/payments', validate(LoanValidator.payment), loanController.recordLoanPayment);

// Analytics Routes
router.get('/analytics', loanController.getLoanAnalytics);

// Late Payment Notification Routes
router.get('/notifications/late-payments', loanController.getLatePaymentNotifications);
router.post('/active/:loanId/send-reminder', loanController.sendPaymentReminder);

export default router;
