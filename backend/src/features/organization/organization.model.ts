export interface Organization {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrganizationFilters {
  name?: string;
  status?: Organization['status'];
}

export type CreateOrganizationDTO = Pick<Organization, 'name' | 'status'>;
export type UpdateOrganizationDTO = Partial<CreateOrganizationDTO>;

export class OrganizationNotFoundError extends Error {
  constructor(id: string) {
    super(`Organization with id ${id} not found`);
    this.name = 'OrganizationNotFoundError';
  }
}