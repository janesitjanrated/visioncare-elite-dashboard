import { z } from 'zod';

export const createLoanApplicationSchema = z.object({
  borrowerName: z.string().min(1, 'Borrower name is required'),
  borrowerId: z.string().min(1, 'Borrower ID is required'),
  borrowerType: z.enum(['staff', 'patient']),
  amount: z.number().min(0, 'Amount must be greater than 0'),
  purpose: z.string().min(1, 'Loan purpose is required'),
  term: z.number().min(1, 'Loan term must be at least 1 month'),
  interestRate: z.number().min(0, 'Interest rate must be greater than or equal to 0')
});

export const updateLoanApplicationSchema = createLoanApplicationSchema.partial();

export const approvalSchema = z.object({
  approvalNote: z.string().min(1, 'Approval note is required')
});

export const rejectionSchema = z.object({
  rejectionReason: z.string().min(1, 'Rejection reason is required')
});

export const loanPaymentSchema = z.object({
  amount: z.number().min(0, 'Payment amount must be greater than 0'),
  paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid payment date'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  reference: z.string().min(1, 'Payment reference is required'),
  notes: z.string().optional()
});

export class LoanValidator {
  static createApplication = createLoanApplicationSchema;
  static updateApplication = updateLoanApplicationSchema;
  static approve = approvalSchema;
  static reject = rejectionSchema;
  static payment = loanPaymentSchema;
}
