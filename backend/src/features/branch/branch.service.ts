import { Knex } from 'knex';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';

interface BranchFilters {
  name?: string;
  address?: string;
  email?: string;
}

export async function getBranches(org_id: string, filters: BranchFilters = {}): Promise<any[]> {
  const query = db<any>('branch').where({ org_id, deleted_at: null });
  
  if (filters.name) query.where('name', 'ilike', `%${filters.name}%`);
  if (filters.address) query.where('address', 'ilike', `%${filters.address}%`);
  if (filters.email) query.where('email', filters.email);
  
  return query;
}

export async function getBranchById(org_id: string, id: string): Promise<any | null> {
  return db<any>('branch').where({ org_id, id, deleted_at: null }).first();
}

export async function createBranch(org_id: string, data: any, user_id: string): Promise<any> {
  const [branch] = await db<any>('branch')
    .insert({ ...data, org_id })
    .returning('*');
    
  await logAudit('create', 'branch', null, branch, { org_id, user_id });
  return branch;
}

export async function updateBranch(org_id: string, id: string, data: any, user_id: string): Promise<any | null> {
  const before = await getBranchById(org_id, id);
  if (!before) return null;
  
  const [after] = await db<any>('branch')
    .where({ org_id, id })
    .update({ ...data, updated_at: db.fn.now() })
    .returning('*');
    
  await logAudit('update', 'branch', before, after, { org_id, user_id });
  return after;
}

export async function deleteBranch(org_id: string, id: string, user_id: string): Promise<boolean> {
  const before = await getBranchById(org_id, id);
  if (!before) return false;
  
  await db<any>('branch')
    .where({ org_id, id })
    .update({ deleted_at: db.fn.now() });
    
  await logAudit('delete', 'branch', before, null, { org_id, user_id });
  return true;
}