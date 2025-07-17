import { Request, Response } from 'express';
import { BranchService } from '../services/BranchService';
import { ValidationError } from '../../../utils/errors';

export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  getAllBranches = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const branches = await this.branchService.getAllBranches(req.org_id);
    res.json({ success: true, data: branches });
  };

  getBranchById = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const branch = await this.branchService.getBranchById(id, req.org_id);
    res.json({ success: true, data: branch });
  };

  createBranch = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const branch = await this.branchService.createBranch({
      ...req.body,
      organizationId: req.org_id
    });
    res.status(201).json({ success: true, data: branch });
  };

  updateBranch = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    const branch = await this.branchService.updateBranch(id, req.org_id, req.body);
    res.json({ success: true, data: branch });
  };

  deleteBranch = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { id } = req.params;
    await this.branchService.deleteBranch(id, req.org_id);
    res.status(204).send();
  };

  // Tenant-specific endpoints
  getBranchTenants = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { branchId } = req.params;
    const tenants = await this.branchService.getBranchTenants(branchId, req.org_id);
    res.json({ success: true, data: tenants });
  };

  addBranchTenant = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { branchId } = req.params;
    const tenant = await this.branchService.addBranchTenant(branchId, req.org_id, req.body);
    res.status(201).json({ success: true, data: tenant });
  };

  removeBranchTenant = async (req: Request, res: Response) => {
    if (!req.org_id) {
      throw new ValidationError('Organization ID is required');
    }

    const { branchId, tenantId } = req.params;
    await this.branchService.removeBranchTenant(branchId, tenantId, req.org_id);
    res.status(204).send();
  };
}
