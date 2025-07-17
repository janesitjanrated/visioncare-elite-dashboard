import { Request, Response } from 'express';
import { LoanService } from '../services/LoanService';
import { ValidationError } from '../../../utils/errors';

export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  // Loan Applications
  getAllLoanApplications = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const status = req.query.status as string | undefined;
    const applications = await this.loanService.getAllLoanApplications(req.org_id, status);
    res.json({ success: true, data: applications });
  };

  getLoanApplicationById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const application = await this.loanService.getLoanApplicationById(id, req.org_id);
    res.json({ success: true, data: application });
  };

  createLoanApplication = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const application = await this.loanService.createLoanApplication({
      ...req.body,
      organizationId: req.org_id,
      status: 'pending'
    });
    res.status(201).json({ success: true, data: application });
  };

  updateLoanApplication = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const application = await this.loanService.updateLoanApplication(id, req.org_id, req.body);
    res.json({ success: true, data: application });
  };

  // Loan Application Status Changes
  approveLoanApplication = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const { approvalNote } = req.body;
    const loan = await this.loanService.approveLoanApplication(id, req.org_id, approvalNote);
    res.json({ success: true, data: loan });
  };

  rejectLoanApplication = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const { rejectionReason } = req.body;
    await this.loanService.rejectLoanApplication(id, req.org_id, rejectionReason);
    res.json({ success: true, message: 'Application rejected successfully' });
  };

  // Active Loans
  getAllActiveLoans = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const loans = await this.loanService.getAllActiveLoans(req.org_id);
    res.json({ success: true, data: loans });
  };

  getLoanById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const loan = await this.loanService.getLoanById(id, req.org_id);
    res.json({ success: true, data: loan });
  };

  // Loan Payments
  recordLoanPayment = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { loanId } = req.params;
    const payment = await this.loanService.recordLoanPayment(loanId, req.org_id, req.body);
    res.status(201).json({ success: true, data: payment });
  };

  getLoanPayments = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { loanId } = req.params;
    const payments = await this.loanService.getLoanPayments(loanId, req.org_id);
    res.json({ success: true, data: payments });
  };

  // Loan Analytics
  getLoanAnalytics = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const analytics = await this.loanService.getLoanAnalytics(req.org_id);
    res.json({ success: true, data: analytics });
  };

  // Late Payment Notifications
  getLatePaymentNotifications = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const notifications = await this.loanService.getLatePaymentNotifications(req.org_id);
    res.json({ success: true, data: notifications });
  };

  sendPaymentReminder = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { loanId } = req.params;
    await this.loanService.sendPaymentReminder(loanId, req.org_id);
    res.json({ success: true, message: 'Payment reminder sent successfully' });
  };
}
