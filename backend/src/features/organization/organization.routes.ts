import { Router } from 'express';
import * as orgController from './organization.controller';
import { jwtAuth } from '../../middlewares/jwtAuth';
import { rbacGuard } from '../../middlewares/rbacGuard';

const router = Router();

router.use(jwtAuth);

router.get('/', rbacGuard(['organization:read']), orgController.getOrganizations);
router.post('/', rbacGuard(['organization:create']), orgController.createOrganization);
router.get('/:id', rbacGuard(['organization:read']), orgController.getOrganizationById);
router.patch('/:id', rbacGuard(['organization:update']), orgController.updateOrganization);
router.delete('/:id', rbacGuard(['organization:delete']), orgController.deleteOrganization);

export default router; 