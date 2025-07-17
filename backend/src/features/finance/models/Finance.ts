import { Knex } from 'knex';
import { NotFoundError } from '../../../utils/errors';

export interface Transaction {
  id: string;
  organizationId: string;
  type: 'income' | 'expense';
  categoryId: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: string;
  reference?: string;
  attachments?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  organizationId: string;
  name: string;
  type: 'income' | 'expense';
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  organizationId: string;
  name: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialStatement {
  totalIncome: number;
  totalExpense: number;
  netIncome: number;
  byCategory: {
    [categoryId: string]: {
      name: string;
      amount: number;
      percentage: number;
    };
  };
}

export interface BalanceSheet {
  assets: {
    [category: string]: number;
  };
  liabilities: {
    [category: string]: number;
  };
  equity: {
    [category: string]: number;
  };
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}

export interface CashFlow {
  operatingActivities: {
    inflows: number;
    outflows: number;
    net: number;
  };
  investingActivities: {
    inflows: number;
    outflows: number;
    net: number;
  };
  financingActivities: {
    inflows: number;
    outflows: number;
    net: number;
  };
  netCashFlow: number;
}

export interface DashboardMetrics {
  currentPeriodIncome: number;
  currentPeriodExpense: number;
  previousPeriodIncome: number;
  previousPeriodExpense: number;
  topExpenseCategories: Array<{
    categoryId: string;
    name: string;
    amount: number;
    percentage: number;
  }>;
  budgetUtilization: Array<{
    categoryId: string;
    name: string;
    budgeted: number;
    actual: number;
    percentage: number;
  }>;
  cashFlowTrend: Array<{
    date: string;
    income: number;
    expense: number;
    net: number;
  }>;
}

export class FinanceModel {
  constructor(private readonly knex: Knex) {}

  // Transactions
  async findTransactions(
    organizationId: string,
    filters: {
      startDate?: string;
      endDate?: string;
      type?: 'income' | 'expense';
      categoryId?: string;
    }
  ): Promise<Transaction[]> {
    const query = this.knex('transactions')
      .where({ organizationId })
      .orderBy('date', 'desc');

    if (filters.startDate) {
      query.where('date', '>=', filters.startDate);
    }
    if (filters.endDate) {
      query.where('date', '<=', filters.endDate);
    }
    if (filters.type) {
      query.where({ type: filters.type });
    }
    if (filters.categoryId) {
      query.where({ categoryId: filters.categoryId });
    }

    return query;
  }

  async findTransactionById(id: string, organizationId: string): Promise<Transaction | null> {
    const transaction = await this.knex('transactions')
      .where({ id, organizationId })
      .first();
    return transaction || null;
  }

  async createTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const [transaction] = await this.knex('transactions')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return transaction;
  }

  async updateTransaction(id: string, organizationId: string, data: Partial<Transaction>): Promise<Transaction> {
    const [transaction] = await this.knex('transactions')
      .where({ id, organizationId })
      .update({
        ...data,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }
    
    return transaction;
  }

  async deleteTransaction(id: string, organizationId: string): Promise<void> {
    const deleted = await this.knex('transactions')
      .where({ id, organizationId })
      .delete();
    
    if (!deleted) {
      throw new NotFoundError('Transaction not found');
    }
  }

  // Categories
  async findCategories(organizationId: string, type?: 'income' | 'expense'): Promise<Category[]> {
    const query = this.knex('categories')
      .where({ organizationId });
    
    if (type) {
      query.where({ type });
    }

    return query.orderBy('name');
  }

  async createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const [category] = await this.knex('categories')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return category;
  }

  async updateCategory(id: string, organizationId: string, data: Partial<Category>): Promise<Category> {
    const [category] = await this.knex('categories')
      .where({ id, organizationId })
      .update({
        ...data,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    
    return category;
  }

  async deleteCategory(id: string, organizationId: string): Promise<void> {
    const deleted = await this.knex('categories')
      .where({ id, organizationId })
      .delete();
    
    if (!deleted) {
      throw new NotFoundError('Category not found');
    }
  }

  // Budgets
  async findBudgets(organizationId: string): Promise<Budget[]> {
    return this.knex('budgets')
      .where({ organizationId })
      .orderBy('startDate', 'desc');
  }

  async findBudgetById(id: string, organizationId: string): Promise<Budget | null> {
    const budget = await this.knex('budgets')
      .where({ id, organizationId })
      .first();
    return budget || null;
  }

  async createBudget(data: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Budget> {
    const [budget] = await this.knex('budgets')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return budget;
  }

  async updateBudget(id: string, organizationId: string, data: Partial<Budget>): Promise<Budget> {
    const [budget] = await this.knex('budgets')
      .where({ id, organizationId })
      .update({
        ...data,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (!budget) {
      throw new NotFoundError('Budget not found');
    }
    
    return budget;
  }

  async deleteBudget(id: string, organizationId: string): Promise<void> {
    const deleted = await this.knex('budgets')
      .where({ id, organizationId })
      .delete();
    
    if (!deleted) {
      throw new NotFoundError('Budget not found');
    }
  }

  // Financial Reports
  async getFinancialStatement(
    organizationId: string,
    startDate: string,
    endDate: string
  ): Promise<FinancialStatement> {
    const transactions = await this.knex.raw(`
      WITH category_totals AS (
        SELECT
          c.id as category_id,
          c.name as category_name,
          c.type,
          SUM(t.amount) as total_amount
        FROM transactions t
        JOIN categories c ON t.categoryId = c.id
        WHERE t.organizationId = ?
          AND t.date BETWEEN ? AND ?
        GROUP BY c.id, c.name, c.type
      )
      SELECT
        SUM(CASE WHEN type = 'income' THEN total_amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN total_amount ELSE 0 END) as total_expense,
        json_object_agg(
          category_id,
          json_build_object(
            'name', category_name,
            'amount', total_amount,
            'percentage', CASE
              WHEN type = 'income' THEN total_amount / NULLIF(SUM(CASE WHEN type = 'income' THEN total_amount END) OVER(), 0) * 100
              ELSE total_amount / NULLIF(SUM(CASE WHEN type = 'expense' THEN total_amount END) OVER(), 0) * 100
            END
          )
        ) as by_category
      FROM category_totals
    `, [organizationId, startDate, endDate]);

    const { total_income, total_expense, by_category } = transactions.rows[0];
    return {
      totalIncome: total_income || 0,
      totalExpense: total_expense || 0,
      netIncome: (total_income || 0) - (total_expense || 0),
      byCategory: by_category || {}
    };
  }

  async getBalanceSheet(organizationId: string, asOfDate: string): Promise<BalanceSheet> {
    // Implementation would depend on your chart of accounts and accounting rules
    return {} as BalanceSheet; // Placeholder
  }

  async getCashFlow(organizationId: string, startDate: string, endDate: string): Promise<CashFlow> {
    // Implementation would depend on your cash flow categorization and accounting rules
    return {} as CashFlow; // Placeholder
  }

  async getDashboardMetrics(
    organizationId: string,
    period: 'day' | 'week' | 'month' | 'year'
  ): Promise<DashboardMetrics> {
    // Complex implementation with multiple queries for different metrics
    return {} as DashboardMetrics; // Placeholder
  }
}
