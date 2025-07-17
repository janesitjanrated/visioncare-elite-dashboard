import { Knex } from 'knex';
import { NotFoundError } from '../../../utils/errors';

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phoneNumber: string;
  email: string;
  organizationId: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface BranchTenant {
  id: string;
  branchId: string;
  name: string;
  businessType: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  status: 'active' | 'inactive';
  contractStartDate: Date;
  contractEndDate: Date;
  rentAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BranchModel {
  constructor(private readonly knex: Knex) {}

  async findAll(organizationId: string): Promise<Branch[]> {
    return this.knex('branches')
      .where({ organizationId })
      .select('*');
  }

  async findById(id: string, organizationId: string): Promise<Branch | null> {
    const branch = await this.knex('branches')
      .where({ id, organizationId })
      .first();
    return branch || null;
  }

  async create(data: Omit<Branch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Branch> {
    const [branch] = await this.knex('branches')
      .insert({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return branch;
  }

  async update(id: string, organizationId: string, data: Partial<Branch>): Promise<Branch> {
    const [branch] = await this.knex('branches')
      .where({ id, organizationId })
      .update({
        ...data,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    
    return branch;
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const deleted = await this.knex('branches')
      .where({ id, organizationId })
      .delete();
    
    if (!deleted) {
      throw new NotFoundError('Branch not found');
    }
  }

  // Tenant-specific methods
  async findTenants(branchId: string, organizationId: string): Promise<BranchTenant[]> {
    const tenants = await this.knex('branch_tenants')
      .join('branches', 'branch_tenants.branchId', 'branches.id')
      .where({
        'branches.id': branchId,
        'branches.organizationId': organizationId
      })
      .select('branch_tenants.*');
    return tenants;
  }

  async addTenant(branchId: string, organizationId: string, data: Omit<BranchTenant, 'id' | 'branchId' | 'createdAt' | 'updatedAt'>): Promise<BranchTenant> {
    // Verify branch exists and belongs to organization
    const branch = await this.findById(branchId, organizationId);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }

    const [tenant] = await this.knex('branch_tenants')
      .insert({
        ...data,
        branchId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    return tenant;
  }

  async removeTenant(branchId: string, tenantId: string, organizationId: string): Promise<void> {
    // Verify branch exists and belongs to organization
    const branch = await this.findById(branchId, organizationId);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }

    const deleted = await this.knex('branch_tenants')
      .where({
        id: tenantId,
        branchId
      })
      .delete();
    
    if (!deleted) {
      throw new NotFoundError('Tenant not found');
    }
  }
}
