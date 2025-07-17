import { BranchModel, Branch, BranchTenant } from '../models/Branch';
import { NotFoundError } from '../../../utils/errors';

export class BranchService {
  constructor(private readonly branchModel: BranchModel) {}

  async getAllBranches(organizationId: string): Promise<Branch[]> {
    return this.branchModel.findAll(organizationId);
  }

  async getBranchById(id: string, organizationId: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id, organizationId);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    return branch;
  }

  async createBranch(data: Omit<Branch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Branch> {
    return this.branchModel.create(data);
  }

  async updateBranch(id: string, organizationId: string, data: Partial<Branch>): Promise<Branch> {
    const branch = await this.branchModel.update(id, organizationId, data);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    return branch;
  }

  async deleteBranch(id: string, organizationId: string): Promise<void> {
    await this.branchModel.delete(id, organizationId);
  }

  // Tenant-specific methods
  async getBranchTenants(branchId: string, organizationId: string): Promise<BranchTenant[]> {
    const tenants = await this.branchModel.findTenants(branchId, organizationId);
    return tenants;
  }

  async addBranchTenant(branchId: string, organizationId: string, data: Omit<BranchTenant, 'id' | 'branchId' | 'createdAt' | 'updatedAt'>): Promise<BranchTenant> {
    return this.branchModel.addTenant(branchId, organizationId, data);
  }

  async removeBranchTenant(branchId: string, tenantId: string, organizationId: string): Promise<void> {
    await this.branchModel.removeTenant(branchId, tenantId, organizationId);
  }
}
