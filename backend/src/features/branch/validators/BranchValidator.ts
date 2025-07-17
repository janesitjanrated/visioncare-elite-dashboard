import { z } from 'zod';

export const createBranchSchema = z.object({
  name: z.string().min(1, 'Branch name is required'),
  code: z.string().min(1, 'Branch code is required'),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email format'),
  status: z.enum(['active', 'inactive']).default('active')
});

export const updateBranchSchema = createBranchSchema.partial();

export const createTenantSchema = z.object({
  name: z.string().min(1, 'Tenant name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email format'),
  status: z.enum(['active', 'inactive']).default('active'),
  contractStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid contract start date'),
  contractEndDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid contract end date'),
  rentAmount: z.number().min(0, 'Rent amount must be greater than or equal to 0')
});

export const updateTenantSchema = createTenantSchema.partial();

export class BranchValidator {
  static create = createBranchSchema;
  static update = updateBranchSchema;
  static createTenant = createTenantSchema;
  static updateTenant = updateTenantSchema;
}
