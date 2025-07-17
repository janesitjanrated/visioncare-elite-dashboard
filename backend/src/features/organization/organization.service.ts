import { Organization, OrganizationFilters, CreateOrganizationDTO, UpdateOrganizationDTO, OrganizationNotFoundError } from './organization.model';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';
import { Knex } from 'knex';

function baseOrganizationQuery(filters: Partial<OrganizationFilters> = {}) {
  const query = db<Organization>('organization')
    .where({ deleted_at: null });

  if (filters.name) {
    query.whereILike('name', `%${filters.name}%`);
  }
  if (filters.status) {
    query.where('status', filters.status);
  }

  return query;
}

function convertDates(org: Organization): Organization {
  return {
    ...org,
    created_at: new Date(org.created_at).toISOString(),
    updated_at: new Date(org.updated_at).toISOString(),
    deleted_at: org.deleted_at ? new Date(org.deleted_at).toISOString() : null
  };
}

export async function getOrganizations(filters: OrganizationFilters = {}): Promise<Organization[]> {
  try {
    const orgs = await baseOrganizationQuery(filters);
    return orgs.map(convertDates);
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
    throw new Error('Failed to fetch organizations');
  }
}

export async function getOrganizationById(id: string): Promise<Organization | null> {
  try {
    const org = await baseOrganizationQuery()
      .where({ id })
      .first();
    return org ? convertDates(org) : null;
  } catch (error) {
    console.error(`Failed to fetch organization ${id}:`, error);
    throw new Error('Failed to fetch organization');
  }
}

export async function createOrganization(data: CreateOrganizationDTO, user_id: string): Promise<Organization> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const now = trx.fn.now();
      const [org] = await trx<Organization>('organization')
        .insert({
          ...data,
          created_at: now,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(org);
      await logAudit('create', 'organization', null, converted, { org_id: org.id, user_id });
      return converted;
    });
  } catch (error) {
    console.error('Failed to create organization:', error);
    throw new Error('Failed to create organization');
  }
}

export async function updateOrganization(id: string, data: UpdateOrganizationDTO, user_id: string): Promise<Organization> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Organization>('organization')
        .where({ id, deleted_at: null })
        .first();

      if (!before) {
        throw new OrganizationNotFoundError(id);
      }

      const now = trx.fn.now();
      const [after] = await trx<Organization>('organization')
        .where({ id })
        .update({
          ...data,
          updated_at: now
        })
        .returning('*');

      const converted = convertDates(after);
      await logAudit('update', 'organization', before, converted, { org_id: id, user_id });
      return converted;
    });
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      throw error;
    }
    console.error(`Failed to update organization ${id}:`, error);
    throw new Error('Failed to update organization');
  }
}

export async function deleteOrganization(id: string, user_id: string): Promise<boolean> {
  try {
    return await db.transaction(async (trx: Knex.Transaction) => {
      const before = await trx<Organization>('organization')
        .where({ id, deleted_at: null })
        .first();

      if (!before) {
        throw new OrganizationNotFoundError(id);
      }

      const now = trx.fn.now();
      await trx('organization')
        .where({ id })
        .update({ 
          deleted_at: now,
          updated_at: now
        });

      await logAudit('delete', 'organization', before, null, { org_id: id, user_id });
      return true;
    });
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      throw error;
    }
    console.error(`Failed to delete organization ${id}:`, error);
    throw new Error('Failed to delete organization');
  }
}
