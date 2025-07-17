import { Router } from 'express';
import authRoutes from '../features/auth/auth.routes';
import patientRoutes from '../features/patient/patient.routes';
import appointmentRoutes from '../features/appointment/appointment.routes';
import staffRoutes from '../features/staff/staff.routes';
import branchRoutes from '../features/branch/branch.routes';
import organizationRoutes from '../features/organization/organization.routes';
import prescriptionRoutes from '../features/prescription/prescription.routes';
import dashboardRoutes from '../features/dashboard/dashboard.routes';

// Import new feature routes
import inventoryRoutes from '../features/inventory/routes/productRoutes';
import stockRoutes from '../features/inventory/routes/stockRoutes';
import financeRoutes from '../features/finance/routes/financeRoutes';
import loanRoutes from '../features/loans/routes/loanRoutes';
import communityRoutes from '../features/community/routes/communityRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Clinic Management API'
  });
});

// Core feature routes
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/staff', staffRoutes);
router.use('/branches', branchRoutes);
router.use('/organizations', organizationRoutes);
router.use('/prescriptions', prescriptionRoutes);
router.use('/dashboard', dashboardRoutes);

// Additional feature routes
router.use('/inventory/products', inventoryRoutes);
router.use('/inventory/stock', stockRoutes);
router.use('/finance', financeRoutes);
router.use('/loans', loanRoutes);
router.use('/community', communityRoutes);

export default router;