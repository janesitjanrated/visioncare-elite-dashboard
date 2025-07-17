import { Staff } from './staff.model';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';

interface StaffData extends Omit<Staff, 'created_at' | 'updated_at' | 'deleted_at'> {
  name: string;
  email: string;
  password_hash: string;
}

function convertDates(staff: any): Staff {
  return {
    ...staff,
    name: staff.name || '',
    password_hash: staff.password_hash || '',
    created_at: staff.created_at.toISOString(),
    updated_at: staff.updated_at.toISOString(),
    deleted_at: staff.deleted_at?.toISOString() || null
  };
}

export async function getStaff(org_id: string, filters: any = {}): Promise<Staff[]> {
  const staffMembers = await db<Staff>('staff')
    .where({ org_id, ...filters, deleted_at: null });
  return staffMembers.map(convertDates);
}

export async function getStaffById(org_id: string, id: string): Promise<Staff | null> {
  const staff = await db<Staff>('staff')
    .where({ org_id, id, deleted_at: null })
    .first();
  return staff ? convertDates(staff) : null;
}

export async function createStaff(org_id: string, data: Partial<StaffData>, user_id: string): Promise<Staff> {
  const now = db.fn.now();
  const [staff] = await db<Staff>('staff')
    .insert({
      ...data,
      org_id,
      created_at: now,
      updated_at: now
    })
    .returning('*');

  const converted = convertDates(staff);
  await logAudit('create', 'staff', null, converted, { org_id, user_id });
  return converted;
}

export async function updateStaff(org_id: string, id: string, data: Partial<StaffData>, user_id: string): Promise<Staff | null> {
  const before = await getStaffById(org_id, id);
  if (!before) return null;

  const now = db.fn.now();
  const [after] = await db<Staff>('staff')
    .where({ org_id, id })
    .update({
      ...data,
      updated_at: now
    })
    .returning('*');

  const converted = convertDates(after);
  await logAudit('update', 'staff', before, converted, { org_id, user_id });
  return converted;
}

export async function deleteStaff(org_id: string, id: string, user_id: string): Promise<boolean> {
  const before = await getStaffById(org_id, id);
  if (!before) return false;

  const now = db.fn.now();
  await db('staff')
    .where({ org_id, id })
    .update({ 
      deleted_at: now,
      updated_at: now
    });

  await logAudit('delete', 'staff', before, null, { org_id, user_id });
  return true;
}