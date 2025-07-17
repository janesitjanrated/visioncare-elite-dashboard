import { Knex } from 'knex';
import db from '../../config/db';
import { logAudit } from '../../utils/logger';

interface AppointmentFilters {
  patient_id?: string;
  date?: Date;
  type?: string;
}

export async function getAppointments(org_id: string, filters: AppointmentFilters = {}): Promise<any[]> {
  const query = db<any>('appointment').where({ org_id, deleted_at: null });
  
  if (filters.patient_id) query.where('patient_id', filters.patient_id);
  if (filters.date) query.where('date', filters.date);
  if (filters.type) query.where('type', filters.type);
  
  return query;
}

export async function getAppointmentById(org_id: string, id: string): Promise<any | null> {
  return db<any>('appointment').where({ org_id, id, deleted_at: null }).first();
}

export async function createAppointment(org_id: string, data: any, user_id: string): Promise<any> {
  const [appointment] = await db<any>('appointment')
    .insert({ ...data, org_id })
    .returning('*');
    
  await logAudit('create', 'appointment', null, appointment, { org_id, user_id });
  return appointment;
}

export async function updateAppointment(org_id: string, id: string, data: any, user_id: string): Promise<any | null> {
  const before = await getAppointmentById(org_id, id);
  if (!before) return null;
  
  const [after] = await db<any>('appointment')
    .where({ org_id, id })
    .update({ ...data, updated_at: db.fn.now() })
    .returning('*');
    
  await logAudit('update', 'appointment', before, after, { org_id, user_id });
  return after;
}

export async function deleteAppointment(org_id: string, id: string, user_id: string): Promise<boolean> {
  const before = await getAppointmentById(org_id, id);
  if (!before) return false;
  
  await db<any>('appointment')
    .where({ org_id, id })
    .update({ deleted_at: db.fn.now() });
    
  await logAudit('delete', 'appointment', before, null, { org_id, user_id });
  return true;
}