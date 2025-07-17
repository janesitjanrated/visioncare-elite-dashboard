import { Knex } from 'knex';
import { ValidationError, NotFoundError } from '../../../utils/errors';

export class FinanceService {
  constructor(private readonly db: Knex) {}

  // Transactions
  async getAllTransactions(
    organizationId: string,
    startDate?: string,
    endDate?: string,
    type?: 'income' | 'expense',
    category?: string
  ) {
    let query = this.db('transactions')
      .where('organization_id', organizationId)
      .orderBy('created_at', 'desc');

    if (startDate) {
      query = query.where('date', '>=', startDate);
    }
    if (endDate) {
      query = query.where('date', '<=', endDate);
    }
    if (type) {
      query = query.where('type', type);
    }
    if (category) {
      query = query.where('category_id', category);
    }

    return await query;
  }

  async getTransactionById(id: string, organizationId: string) {
    const transaction = await this.db('transactions')
      .where({ id, organization_id: organizationId })
      .first();

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }

  async createTransaction(data: any) {
    const [transaction] = await this.db('transactions')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return transaction;
  }

  async updateTransaction(id: string, organizationId: string, data: any) {
    const [updated] = await this.db('transactions')
      .where({ id, organization_id: organizationId })
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Transaction not found');
    }

    return updated;
  }

  async deleteTransaction(id: string, organizationId: string) {
    const deleted = await this.db('transactions')
      .where({ id, organization_id: organizationId })
      .delete();

    if (!deleted) {
      throw new NotFoundError('Transaction not found');
    }
  }

  // Financial Reports
  async getIncomeStatement(organizationId: string, startDate?: string, endDate?: string) {
    // Query to get income and expenses within the date range
    const transactions = await this.getAllTransactions(organizationId, startDate, endDate);
    
    const income = transactions.filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expenses = transactions.filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      income,
      expenses,
      netIncome: income - expenses,
      period: { startDate, endDate }
    };
  }

  async getBalanceSheet(organizationId: string, asOfDate?: string) {
    // Query to get assets, liabilities, and equity as of the specified date
    const query = this.db('balance_sheet')
      .where('organization_id', organizationId);

    if (asOfDate) {
      query.where('date', '<=', asOfDate);
    }

    const balanceSheet = await query.first();
    return balanceSheet;
  }

  async getCashFlow(organizationId: string, startDate?: string, endDate?: string) {
    // Query to get cash flow transactions within the date range
    const transactions = await this.getAllTransactions(organizationId, startDate, endDate);
    
    return {
      operatingActivities: this.calculateOperatingCashFlow(transactions),
      investingActivities: this.calculateInvestingCashFlow(transactions),
      financingActivities: this.calculateFinancingCashFlow(transactions),
      period: { startDate, endDate }
    };
  }

  // Categories
  async getAllCategories(organizationId: string, type?: 'income' | 'expense') {
    let query = this.db('finance_categories')
      .where('organization_id', organizationId);

    if (type) {
      query = query.where('type', type);
    }

    return await query;
  }

  async createCategory(data: any) {
    const [category] = await this.db('finance_categories')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return category;
  }

  async updateCategory(id: string, organizationId: string, data: any) {
    const [updated] = await this.db('finance_categories')
      .where({ id, organization_id: organizationId })
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Category not found');
    }

    return updated;
  }

  async deleteCategory(id: string, organizationId: string) {
    const deleted = await this.db('finance_categories')
      .where({ id, organization_id: organizationId })
      .delete();

    if (!deleted) {
      throw new NotFoundError('Category not found');
    }
  }

  // Budgets
  async getAllBudgets(organizationId: string) {
    return await this.db('budgets')
      .where('organization_id', organizationId)
      .orderBy('created_at', 'desc');
  }

  async getBudgetById(id: string, organizationId: string) {
    const budget = await this.db('budgets')
      .where({ id, organization_id: organizationId })
      .first();

    if (!budget) {
      throw new NotFoundError('Budget not found');
    }

    return budget;
  }

  async createBudget(data: any) {
    const [budget] = await this.db('budgets')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    return budget;
  }

  async updateBudget(id: string, organizationId: string, data: any) {
    const [updated] = await this.db('budgets')
      .where({ id, organization_id: organizationId })
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');

    if (!updated) {
      throw new NotFoundError('Budget not found');
    }

    return updated;
  }

  async deleteBudget(id: string, organizationId: string) {
    const deleted = await this.db('budgets')
      .where({ id, organization_id: organizationId })
      .delete();

    if (!deleted) {
      throw new NotFoundError('Budget not found');
    }
  }

  // Dashboard Analytics
  async getFinancialDashboard(organizationId: string, period: 'day' | 'week' | 'month' | 'year' = 'month') {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    const transactions = await this.getAllTransactions(
      organizationId,
      startDate.toISOString(),
      new Date().toISOString()
    );

    return {
      totalIncome: this.calculateTotalIncome(transactions),
      totalExpenses: this.calculateTotalExpenses(transactions),
      topCategories: this.getTopCategories(transactions),
      trends: this.calculateTrends(transactions, period)
    };
  }

  // Tax Reports
  async getTaxReport(organizationId: string, year?: string, quarter?: string) {
    const startDate = this.calculateTaxPeriodStart(year, quarter);
    const endDate = this.calculateTaxPeriodEnd(year, quarter);

    const transactions = await this.getAllTransactions(
      organizationId,
      startDate?.toISOString(),
      endDate?.toISOString()
    );

    return {
      totalIncome: this.calculateTaxableIncome(transactions),
      totalDeductions: this.calculateDeductions(transactions),
      taxableIncome: this.calculateNetTaxableIncome(transactions),
      estimatedTax: this.calculateEstimatedTax(transactions),
      period: { year, quarter }
    };
  }

  // Private helper methods
  private calculateOperatingCashFlow(transactions: any[]) {
    return transactions
      .filter(t => t.category === 'operating')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateInvestingCashFlow(transactions: any[]) {
    return transactions
      .filter(t => t.category === 'investing')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateFinancingCashFlow(transactions: any[]) {
    return transactions
      .filter(t => t.category === 'financing')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateTotalIncome(transactions: any[]) {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateTotalExpenses(transactions: any[]) {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private getTopCategories(transactions: any[]) {
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category_id] = (acc[t.category_id] || 0) + Number(t.amount);
      return acc;
    }, {});

    return Object.entries(categoryTotals)
      .sort(([, a], [, b]) => Number(b) - Number(a))
      .slice(0, 5);
  }

  private calculateTrends(transactions: any[], period: string) {
    // Implementation will depend on the specific trend analysis requirements
    return [];
  }

  private calculateTaxPeriodStart(year?: string, quarter?: string): Date | undefined {
    if (!year) return undefined;
    
    if (quarter) {
      const month = (Number(quarter) - 1) * 3;
      return new Date(Number(year), month, 1);
    }
    
    return new Date(Number(year), 0, 1);
  }

  private calculateTaxPeriodEnd(year?: string, quarter?: string): Date | undefined {
    if (!year) return undefined;
    
    if (quarter) {
      const month = Number(quarter) * 3 - 1;
      return new Date(Number(year), month, 31);
    }
    
    return new Date(Number(year), 11, 31);
  }

  private calculateTaxableIncome(transactions: any[]) {
    return transactions
      .filter(t => t.type === 'income' && t.taxable)
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateDeductions(transactions: any[]) {
    return transactions
      .filter(t => t.type === 'expense' && t.deductible)
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  private calculateNetTaxableIncome(transactions: any[]) {
    const taxableIncome = this.calculateTaxableIncome(transactions);
    const deductions = this.calculateDeductions(transactions);
    return taxableIncome - deductions;
  }

  private calculateEstimatedTax(transactions: any[]) {
    const netTaxableIncome = this.calculateNetTaxableIncome(transactions);
    // Implement tax calculation logic based on tax brackets
    return netTaxableIncome * 0.2; // Simplified example
  }
}
