import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import { AppError } from '../../utils/errors';

function requireOrg(req: Request): string {
  if (!(req as any).org_id) {
    throw new AppError('Organization ID is required', 400);
  }
  return (req as any).org_id;
}

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  getTodayRevenue = async (req: Request, res: Response) => {
    try {
      const data = await this.dashboardService.getTodayRevenue();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Failed to fetch revenue data' }
      });
    }
  };

  getAppointmentsOverview = async (req: Request, res: Response) => {
    try {
      const org_id = requireOrg(req);
      const data = await this.dashboardService.getAppointmentsOverview(org_id);
      res.json({ success: true, data });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.status).json({
          success: false,
          error: { message: error.message }
        });
      }
      res.status(500).json({
        success: false,
        error: { message: 'Failed to fetch appointment data' }
      });
    }
  };

  getInventoryAlerts = async (req: Request, res: Response) => {
    try {
      const org_id = requireOrg(req);
      const data = await this.dashboardService.getInventoryAlerts(org_id);
      res.json({ success: true, data });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.status).json({
          success: false,
          error: { message: error.message }
        });
      }
      res.status(500).json({
        success: false,
        error: { message: 'Failed to fetch inventory alerts' }
      });
    }
  };

  getStaffProductivity = async (req: Request, res: Response) => {
    try {
      const org_id = requireOrg(req);
      const data = await this.dashboardService.getStaffProductivity(org_id);
      res.json({ success: true, data });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.status).json({
          success: false,
          error: { message: error.message }
        });
      }
      res.status(500).json({
        success: false,
        error: { message: 'Failed to fetch staff productivity data' }
      });
    }
  };
}
