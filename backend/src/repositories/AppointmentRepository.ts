
import { Pool } from 'pg';
import { Appointment } from '../models/Appointment';

export class AppointmentRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<Appointment[]> {
    const query = `
      SELECT a.*, p.name as patient_name, p.phone as patient_phone
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      ORDER BY a.appointment_date DESC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async create(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'patient_name' | 'patient_phone'>): Promise<Appointment> {
    const query = `
      INSERT INTO appointments (patient_id, appointment_date, notes, status) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      appointmentData.patient_id, 
      appointmentData.appointment_date, 
      appointmentData.notes, 
      appointmentData.status
    ]);
    return result.rows[0];
  }

  async update(id: number, appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'patient_name' | 'patient_phone'>): Promise<Appointment | null> {
    const query = `
      UPDATE appointments 
      SET patient_id = $1, appointment_date = $2, notes = $3, status = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      appointmentData.patient_id, 
      appointmentData.appointment_date, 
      appointmentData.notes, 
      appointmentData.status, 
      id
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}
