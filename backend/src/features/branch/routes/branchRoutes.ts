import { Router } from 'express';
import { BranchController } from '../controllers/BranchController';
import { BranchService } from '../services/BranchService';
import { BranchModel } from '../models/Branch';
import validate from '../../../middlewares/validate';
import { BranchValidator } from '../validators/BranchValidator';
import db from '../../../config/db';
import { jwtAuth } from '../../../middlewares/jwtAuth';
import { orgContext } from '../../../middlewares/orgContext';
import { rbacGuard } from '../../../middlewares/rbacGuard';

const router = Router();
const branchModel = new BranchModel(db);
const branchService = new BranchService(branchModel);
const branchController = new BranchController(branchService);

// Apply middleware
router.use(jwtAuth);
router.use(orgContext);
router.use(rbacGuard(['admin', 'manager']));

// Branch routes
router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);
router.post('/', validate(BranchValidator.create), branchController.createBranch);
router.put('/:id', validate(BranchValidator.update), branchController.updateBranch);
router.delete('/:id', branchController.deleteBranch);

// Tenant routes
router.get('/:branchId/tenants', branchController.getBranchTenants);
router.post('/:branchId/tenants', validate(BranchValidator.createTenant), branchController.addBranchTenant);
router.delete('/:branchId/tenants/:tenantId', branchController.removeBranchTenant);

export default router;
