
import { Pool } from 'pg';
import { Patient } from '../models/Patient';

export class PatientRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<Patient[]> {
    const query = 'SELECT * FROM patients ORDER BY created_at DESC';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findById(id: number): Promise<Patient | null> {
    const query = 'SELECT * FROM patients WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async create(patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> {
    const query = `
      INSERT INTO patients (name, email, phone, date_of_birth, address) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      patientData.name, 
      patientData.email, 
      patientData.phone, 
      patientData.date_of_birth, 
      patientData.address
    ]);
    return result.rows[0];
  }

  async update(id: number, patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient | null> {
    const query = `
      UPDATE patients 
      SET name = $1, email = $2, phone = $3, date_of_birth = $4, address = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      patientData.name, 
      patientData.email, 
      patientData.phone, 
      patientData.date_of_birth, 
      patientData.address, 
      id
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM patients WHERE id = $1 RETURNING *';
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0;
  }
}
