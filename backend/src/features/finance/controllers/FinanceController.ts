import { Request, Response } from 'express';
import { FinanceService } from '../services/FinanceService';
import { ValidationError } from '../../../utils/errors';

export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // Transactions
  getAllTransactions = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { startDate, endDate, type, category } = req.query as {
      startDate?: string;
      endDate?: string;
      type?: 'income' | 'expense';
      category?: string;
    };

    const transactions = await this.financeService.getAllTransactions(
      req.org_id,
      startDate,
      endDate,
      type,
      category
    );
    res.json({ success: true, data: transactions });
  };

  getTransactionById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const transaction = await this.financeService.getTransactionById(id, req.org_id);
    res.json({ success: true, data: transaction });
  };

  createTransaction = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const transaction = await this.financeService.createTransaction({
      ...req.body,
      organizationId: req.org_id
    });
    res.status(201).json({ success: true, data: transaction });
  };

  updateTransaction = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const transaction = await this.financeService.updateTransaction(id, req.org_id, req.body);
    res.json({ success: true, data: transaction });
  };

  deleteTransaction = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.financeService.deleteTransaction(id, req.org_id);
    res.status(204).send();
  };

  // Financial Reports
  getIncomeStatement = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };
    const report = await this.financeService.getIncomeStatement(req.org_id, startDate, endDate);
    res.json({ success: true, data: report });
  };

  getBalanceSheet = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { asOfDate } = req.query as { asOfDate?: string };
    const report = await this.financeService.getBalanceSheet(req.org_id, asOfDate);
    res.json({ success: true, data: report });
  };

  getCashFlow = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };
    const report = await this.financeService.getCashFlow(req.org_id, startDate, endDate);
    res.json({ success: true, data: report });
  };

  // Categories
  getAllCategories = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { type } = req.query as { type?: 'income' | 'expense' };
    const categories = await this.financeService.getAllCategories(req.org_id, type);
    res.json({ success: true, data: categories });
  };

  createCategory = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const category = await this.financeService.createCategory({
      ...req.body,
      organizationId: req.org_id
    });
    res.status(201).json({ success: true, data: category });
  };

  updateCategory = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const category = await this.financeService.updateCategory(id, req.org_id, req.body);
    res.json({ success: true, data: category });
  };

  deleteCategory = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.financeService.deleteCategory(id, req.org_id);
    res.status(204).send();
  };

  // Budgets
  getAllBudgets = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const budgets = await this.financeService.getAllBudgets(req.org_id);
    res.json({ success: true, data: budgets });
  };

  getBudgetById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const budget = await this.financeService.getBudgetById(id, req.org_id);
    res.json({ success: true, data: budget });
  };

  createBudget = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const budget = await this.financeService.createBudget({
      ...req.body,
      organizationId: req.org_id
    });
    res.status(201).json({ success: true, data: budget });
  };

  updateBudget = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const budget = await this.financeService.updateBudget(id, req.org_id, req.body);
    res.json({ success: true, data: budget });
  };

  deleteBudget = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.financeService.deleteBudget(id, req.org_id);
    res.status(204).send();
  };

  // Dashboard Analytics
  getFinancialDashboard = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { period } = req.query as { period?: 'day' | 'week' | 'month' | 'year' };
    const dashboard = await this.financeService.getFinancialDashboard(req.org_id, period);
    res.json({ success: true, data: dashboard });
  };

  // Tax Reports
  getTaxReport = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { year, quarter } = req.query as { year?: string; quarter?: string };
    const report = await this.financeService.getTaxReport(req.org_id, year, quarter);
    res.json({ success: true, data: report });
  };
}
