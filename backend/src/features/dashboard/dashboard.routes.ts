import express from 'express';
import { DashboardController } from './dashboard.controller';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = express.Router();
const dashboardController = new DashboardController();

// Dashboard KPI endpoints
router.get('/revenue/today', rbacGuard(['dashboard:read']), dashboardController.getTodayRevenue);
router.get('/appointments/overview', rbacGuard(['dashboard:read']), dashboardController.getAppointmentsOverview);
router.get('/inventory/alerts', rbacGuard(['dashboard:read']), dashboardController.getInventoryAlerts);
router.get('/staff/productivity', rbacGuard(['dashboard:read']), dashboardController.getStaffProductivity);

export default router;
