import { z } from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  categoryId: z.string().min(1, 'Category is required'),
  amount: z.number().min(0, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  reference: z.string().optional(),
  attachments: z.array(z.string()).optional()
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  type: z.enum(['income', 'expense']),
  description: z.string().optional(),
  parentId: z.string().optional()
});

export const updateCategorySchema = createCategorySchema.partial();

export const createBudgetSchema = z.object({
  name: z.string().min(1, 'Budget name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  amount: z.number().min(0, 'Amount must be greater than 0'),
  period: z.enum(['monthly', 'quarterly', 'yearly']),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid start date'),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid end date'),
  notes: z.string().optional()
});

export const updateBudgetSchema = createBudgetSchema.partial();

export class FinanceValidator {
  static createTransaction = createTransactionSchema;
  static updateTransaction = updateTransactionSchema;
  static createCategory = createCategorySchema;
  static updateCategory = updateCategorySchema;
  static createBudget = createBudgetSchema;
  static updateBudget = updateBudgetSchema;
}
