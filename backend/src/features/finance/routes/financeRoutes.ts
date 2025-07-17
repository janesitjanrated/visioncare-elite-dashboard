import { Router } from 'express';
import { FinanceController } from '../controllers/FinanceController';
import { FinanceService } from '../services/FinanceService';
import { FinanceModel } from '../models/Finance';
import validate from '../../../middlewares/validate';
import { FinanceValidator } from '../validators/FinanceValidator';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';

const router = Router();
const financeModel = new FinanceModel(db);
const financeService = new FinanceService(db);
const financeController = new FinanceController(financeService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager', 'finance']));

// Transaction Routes
router.get('/transactions', financeController.getAllTransactions);
router.get('/transactions/:id', financeController.getTransactionById);
router.post('/transactions', validate(FinanceValidator.createTransaction), financeController.createTransaction);
router.put('/transactions/:id', validate(FinanceValidator.updateTransaction), financeController.updateTransaction);
router.delete('/transactions/:id', financeController.deleteTransaction);

// Financial Report Routes
router.get('/reports/income-statement', financeController.getIncomeStatement);
router.get('/reports/balance-sheet', financeController.getBalanceSheet);
router.get('/reports/cash-flow', financeController.getCashFlow);
router.get('/reports/tax', financeController.getTaxReport);

// Category Routes
router.get('/categories', financeController.getAllCategories);
router.post('/categories', validate(FinanceValidator.createCategory), financeController.createCategory);
router.put('/categories/:id', validate(FinanceValidator.updateCategory), financeController.updateCategory);
router.delete('/categories/:id', financeController.deleteCategory);

// Budget Routes
router.get('/budgets', financeController.getAllBudgets);
router.get('/budgets/:id', financeController.getBudgetById);
router.post('/budgets', validate(FinanceValidator.createBudget), financeController.createBudget);
router.put('/budgets/:id', validate(FinanceValidator.updateBudget), financeController.updateBudget);
router.delete('/budgets/:id', financeController.deleteBudget);

// Dashboard Route
router.get('/dashboard', financeController.getFinancialDashboard);

export default router;
