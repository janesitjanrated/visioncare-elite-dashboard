import { Router } from 'express';
import * as branchController from './branch.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { orgContext } from '../../middlewares/orgContext';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

router.use(jwtAuth, orgContext);

router.get('/', rbacGuard(['branch:read']), branchController.getBranches);
router.post('/', rbacGuard(['branch:create']), branchController.createBranch);
router.get('/:id', rbacGuard(['branch:read']), branchController.getBranchById);
router.patch('/:id', rbacGuard(['branch:update']), branchController.updateBranch);
router.delete('/:id', rbacGuard(['branch:delete']), branchController.deleteBranch);

export default router; 