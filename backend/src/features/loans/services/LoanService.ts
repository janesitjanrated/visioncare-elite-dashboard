import { LoanModel, LoanApplication, Loan, LoanPayment, LoanAnalytics } from '../models/Loan';
import { NotFoundError, ValidationError, ConflictError } from '../../../utils/errors';

export class LoanService {
  constructor(private readonly loanModel: LoanModel) {}

  // Loan Applications
  async getAllLoanApplications(organizationId: string, status?: string): Promise<LoanApplication[]> {
    return this.loanModel.findAllApplications(organizationId, status);
  }

  async getLoanApplicationById(id: string, organizationId: string): Promise<LoanApplication> {
    const application = await this.loanModel.findApplicationById(id, organizationId);
    if (!application) {
      throw new NotFoundError('Loan application not found');
    }
    return application;
  }

  async createLoanApplication(data: Omit<LoanApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<LoanApplication> {
    return this.loanModel.createApplication(data);
  }

  async updateLoanApplication(id: string, organizationId: string, data: Partial<LoanApplication>): Promise<LoanApplication> {
    const application = await this.getLoanApplicationById(id, organizationId);
    
    if (application.status !== 'pending') {
      throw new ConflictError('Can only update pending applications');
    }

    return this.loanModel.updateApplication(id, organizationId, data);
  }

  async approveLoanApplication(id: string, organizationId: string, approvalNote: string): Promise<Loan> {
    const application = await this.getLoanApplicationById(id, organizationId);
    
    if (application.status !== 'pending') {
      throw new ConflictError('Can only approve pending applications');
    }

    // Update application status
    await this.loanModel.updateApplication(id, organizationId, {
      status: 'approved',
      approvalNote,
      approvedAt: new Date()
    });

    // Calculate loan terms
    const totalPayable = application.amount * (1 + (application.interestRate * application.term / 12));
    const monthlyPayment = totalPayable / application.term;

    // Create new loan
    const loan = await this.loanModel.createLoan({
      applicationId: application.id,
      organizationId: application.organizationId,
      borrowerName: application.borrowerName,
      borrowerId: application.borrowerId,
      borrowerType: application.borrowerType,
      amount: application.amount,
      purpose: application.purpose,
      term: application.term,
      interestRate: application.interestRate,
      monthlyPayment,
      totalPayable,
      startDate: new Date(),
      endDate: new Date(Date.now() + application.term * 30 * 24 * 60 * 60 * 1000), // Approximate end date
      status: 'active'
    });

    return loan;
  }

  async rejectLoanApplication(id: string, organizationId: string, rejectionReason: string): Promise<void> {
    const application = await this.getLoanApplicationById(id, organizationId);
    
    if (application.status !== 'pending') {
      throw new ConflictError('Can only reject pending applications');
    }

    await this.loanModel.updateApplication(id, organizationId, {
      status: 'rejected',
      rejectionReason
    });
  }

  // Active Loans
  async getAllActiveLoans(organizationId: string): Promise<Loan[]> {
    return this.loanModel.findAllLoans(organizationId);
  }

  async getLoanById(id: string, organizationId: string): Promise<Loan> {
    const loan = await this.loanModel.findLoanById(id, organizationId);
    if (!loan) {
      throw new NotFoundError('Loan not found');
    }
    return loan;
  }

  // Loan Payments
  async getLoanPayments(loanId: string, organizationId: string): Promise<LoanPayment[]> {
    await this.getLoanById(loanId, organizationId); // Verify loan exists and belongs to organization
    return this.loanModel.findPaymentsByLoanId(loanId, organizationId);
  }

  async recordLoanPayment(loanId: string, organizationId: string, data: Omit<LoanPayment, 'id' | 'loanId' | 'createdAt' | 'updatedAt'>): Promise<LoanPayment> {
    const loan = await this.getLoanById(loanId, organizationId);
    
    if (loan.status !== 'active') {
      throw new ConflictError('Can only record payments for active loans');
    }

    return this.loanModel.createPayment({
      ...data,
      loanId
    });
  }

  // Analytics
  async getLoanAnalytics(organizationId: string): Promise<LoanAnalytics> {
    return this.loanModel.getAnalytics(organizationId);
  }

  // Late Payment Notifications
  async getLatePaymentNotifications(organizationId: string): Promise<any[]> {
    return this.loanModel.findLatePayments(organizationId);
  }

  async sendPaymentReminder(loanId: string, organizationId: string): Promise<void> {
    const loan = await this.getLoanById(loanId, organizationId);
    
    if (loan.status !== 'active') {
      throw new ConflictError('Can only send reminders for active loans');
    }

    // TODO: Implement notification sending logic
    // This could involve sending emails, SMS, or creating notifications in the system
  }
}
