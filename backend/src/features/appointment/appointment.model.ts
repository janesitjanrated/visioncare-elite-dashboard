import db from '../../config/db';

export interface Appointment {
  id: string;
  patient_id: string;
  staff_id: string;
  branch_id: string;
  type?: string;
  date: string;
  time: string; // Added time field
  status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

/**
 * Create a new appointment
 * @param appointmentData - Appointment data
 * @returns Created appointment
 */
export async function createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
  const { patient_id, date, time, type, notes } = appointmentData;
  const [result] = await db('appointments')
    .insert({
      patient_id,
      date,
      time,
      type,
      notes: notes || null
    })
    .returning('*');
  return result;
}

/**
 * Get all appointments
 * @returns List of appointments
 */
export async function getAllAppointments(): Promise<Appointment[]> {
  return db('appointments')
    .orderBy('date', 'desc')
    .orderBy('time', 'desc');
}

/**
 * Delete an appointment by ID
 * @param appointmentId - number
 */
export async function deleteAppointment(appointmentId: number): Promise<void> {
  await db('appointments')
    .where({ id: appointmentId })
    .del();
} 