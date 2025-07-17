import { Knex } from 'knex';
import { NotFoundError } from '../../../utils/errors';

export interface LoanApplication {
  id: string;
  organizationId: string;
  borrowerName: string;
  borrowerId: string;
  borrowerType: 'staff' | 'patient';
  amount: number;
  purpose: string;
  term: number; // in months
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected';
  approvalNote?: string;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  applicationId: string;
  organizationId: string;
  borrowerName: string;
  borrowerId: string;
  borrowerType: 'staff' | 'patient';
  amount: number;
  purpose: string;
  term: number; // in months
  interestRate: number;
  monthlyPayment: number;
  totalPayable: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'defaulted';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanPayment {
  id: string;
  loanId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  reference: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanAnalytics {
  totalActiveLoans: number;
  totalLoanAmount: number;
  totalOutstandingAmount: number;
  totalCollectedAmount: number;
  defaultRate: number;
  onTimePaymentRate: number;
}

export class LoanModel {
  constructor(private readonly knex: Knex) {}

  // Loan Applications
  async findAllApplications(organizationId: string, status?: string): Promise<LoanApplication[]> {
    const query = this.knex('loan_applications')
      .where({ organizationId });
    
    if (status) {
      query.where({ status });
    }

    return query.orderBy('createdAt', 'desc');
  }

  async findApplicationById(id: string, organizationId: string): Promise<LoanApplication | null> {
    const application = await this.knex('loan_applications')
      .where({ id, organizationId })
      .first();
    return application || null;
  }

  async createApplication(data: Omit<LoanApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<LoanApplication> {
    const [application] = await this.knex('loan_applications')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return application;
  }

  async updateApplication(id: string, organizationId: string, data: Partial<LoanApplication>): Promise<LoanApplication> {
    const [application] = await this.knex('loan_applications')
      .where({ id, organizationId })
      .update({
        ...data,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (!application) {
      throw new NotFoundError('Loan application not found');
    }
    
    return application;
  }

  // Active Loans
  async findAllLoans(organizationId: string): Promise<Loan[]> {
    return this.knex('loans')
      .where({ organizationId })
      .orderBy('createdAt', 'desc');
  }

  async findLoanById(id: string, organizationId: string): Promise<Loan | null> {
    const loan = await this.knex('loans')
      .where({ id, organizationId })
      .first();
    return loan || null;
  }

  async createLoan(data: Omit<Loan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Loan> {
    const [loan] = await this.knex('loans')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return loan;
  }

  // Loan Payments
  async findPaymentsByLoanId(loanId: string, organizationId: string): Promise<LoanPayment[]> {
    return this.knex('loan_payments')
      .join('loans', 'loan_payments.loanId', 'loans.id')
      .where({
        'loans.id': loanId,
        'loans.organizationId': organizationId
      })
      .select('loan_payments.*')
      .orderBy('paymentDate', 'desc');
  }

  async createPayment(data: Omit<LoanPayment, 'id' | 'createdAt' | 'updatedAt'>): Promise<LoanPayment> {
    const [payment] = await this.knex('loan_payments')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return payment;
  }

  // Analytics
  async getAnalytics(organizationId: string): Promise<LoanAnalytics> {
    const [result] = await this.knex.raw(`
      WITH loan_stats AS (
        SELECT 
          COUNT(*) FILTER (WHERE status = 'active') as active_loans,
          SUM(amount) as total_amount,
          SUM(CASE WHEN status = 'active' THEN amount - (
            SELECT COALESCE(SUM(amount), 0)
            FROM loan_payments
            WHERE loan_payments.loanId = loans.id
          ) ELSE 0 END) as outstanding_amount,
          SUM(CASE WHEN status = 'defaulted' THEN 1 ELSE 0 END)::float / COUNT(*)::float as default_rate
        FROM loans
        WHERE organizationId = ?
      ),
      payment_stats AS (
        SELECT
          SUM(amount) as collected_amount,
          COUNT(*) FILTER (WHERE paymentDate <= dueDate)::float / COUNT(*)::float as on_time_rate
        FROM loan_payments
        JOIN loan_payment_schedules ON loan_payments.scheduleId = loan_payment_schedules.id
        JOIN loans ON loan_payment_schedules.loanId = loans.id
        WHERE loans.organizationId = ?
      )
      SELECT
        loan_stats.active_loans as "totalActiveLoans",
        loan_stats.total_amount as "totalLoanAmount",
        loan_stats.outstanding_amount as "totalOutstandingAmount",
        payment_stats.collected_amount as "totalCollectedAmount",
        loan_stats.default_rate as "defaultRate",
        payment_stats.on_time_rate as "onTimePaymentRate"
      FROM loan_stats, payment_stats
    `, [organizationId, organizationId]);

    return result;
  }

  // Late Payment Notifications
  async findLatePayments(organizationId: string): Promise<any[]> {
    return this.knex.raw(`
      SELECT 
        loans.id as "loanId",
        loans.borrowerName,
        loans.borrowerId,
        loans.borrowerType,
        loan_payment_schedules.dueDate,
        loan_payment_schedules.amount as "dueAmount",
        CURRENT_DATE - loan_payment_schedules.dueDate as "daysLate"
      FROM loans
      JOIN loan_payment_schedules ON loans.id = loan_payment_schedules.loanId
      LEFT JOIN loan_payments ON loan_payment_schedules.id = loan_payments.scheduleId
      WHERE 
        loans.organizationId = ?
        AND loans.status = 'active'
        AND loan_payment_schedules.dueDate < CURRENT_DATE
        AND loan_payments.id IS NULL
      ORDER BY loan_payment_schedules.dueDate ASC
    `, [organizationId]);
  }
}
