import { Router } from 'express';
import * as staffController from './staff.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { orgContext } from '../../middlewares/orgContext';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

router.use(jwtAuth, orgContext);

router.get('/', rbacGuard(['staff:read']), staffController.getStaff);
router.post('/', rbacGuard(['staff:create']), staffController.createStaff);
router.get('/:id', rbacGuard(['staff:read']), staffController.getStaffById);
router.patch('/:id', rbacGuard(['staff:update']), staffController.updateStaff);
router.delete('/:id', rbacGuard(['staff:delete']), staffController.deleteStaff);

export default router; 