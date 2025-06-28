
import { Pool } from 'pg';
import { ExamForm, PatientInfo, VisualAcuity, Refraction, SlitLamp, Fundus, Diagnosis } from '../models/ExamForm';

export class ExamFormRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<ExamForm[]> {
    const query = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      ORDER BY ef.exam_date DESC
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findById(id: number): Promise<ExamForm | null> {
    const query = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      WHERE ef.id = $1
    `;
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByPatientId(patientId: number): Promise<ExamForm[]> {
    const query = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      WHERE ef.patient_id = $1
      ORDER BY ef.exam_date DESC
    `;
    const result = await this.pool.query(query, [patientId]);
    return result.rows;
  }

  async create(examFormData: Omit<ExamForm, 'id' | 'created_at' | 'updated_at' | 'patient_name' | 'patient_phone' | 'doctor_name'>): Promise<ExamForm> {
    const query = `
      INSERT INTO exam_forms (patient_id, doctor_id, exam_date, status) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      examFormData.patient_id, 
      examFormData.doctor_id, 
      examFormData.exam_date, 
      examFormData.status
    ]);
    return result.rows[0];
  }

  // Patient Info methods
  async findPatientInfo(examFormId: number): Promise<PatientInfo | null> {
    const query = 'SELECT * FROM exam_patient_info WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertPatientInfo(patientInfo: Omit<PatientInfo, 'id'>): Promise<PatientInfo> {
    const query = `
      INSERT INTO exam_patient_info (exam_form_id, chief_complaint, present_illness, past_medical_history, family_history, social_history, medications, allergies)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        chief_complaint = EXCLUDED.chief_complaint,
        present_illness = EXCLUDED.present_illness,
        past_medical_history = EXCLUDED.past_medical_history,
        family_history = EXCLUDED.family_history,
        social_history = EXCLUDED.social_history,
        medications = EXCLUDED.medications,
        allergies = EXCLUDED.allergies
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      patientInfo.exam_form_id,
      patientInfo.chief_complaint,
      patientInfo.present_illness,
      patientInfo.past_medical_history,
      patientInfo.family_history,
      patientInfo.social_history,
      patientInfo.medications,
      patientInfo.allergies
    ]);
    return result.rows[0];
  }

  // Visual Acuity methods
  async findVisualAcuity(examFormId: number): Promise<VisualAcuity | null> {
    const query = 'SELECT * FROM exam_visual_acuity WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertVisualAcuity(visualAcuity: Omit<VisualAcuity, 'id'>): Promise<VisualAcuity> {
    const query = `
      INSERT INTO exam_visual_acuity (exam_form_id, right_eye_unaided, left_eye_unaided, right_eye_aided, left_eye_aided, right_eye_pinhole, left_eye_pinhole)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        right_eye_unaided = EXCLUDED.right_eye_unaided,
        left_eye_unaided = EXCLUDED.left_eye_unaided,
        right_eye_aided = EXCLUDED.right_eye_aided,
        left_eye_aided = EXCLUDED.left_eye_aided,
        right_eye_pinhole = EXCLUDED.right_eye_pinhole,
        left_eye_pinhole = EXCLUDED.left_eye_pinhole
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      visualAcuity.exam_form_id,
      visualAcuity.right_eye_unaided,
      visualAcuity.left_eye_unaided,
      visualAcuity.right_eye_aided,
      visualAcuity.left_eye_aided,
      visualAcuity.right_eye_pinhole,
      visualAcuity.left_eye_pinhole
    ]);
    return result.rows[0];
  }

  // Refraction methods
  async findRefraction(examFormId: number): Promise<Refraction | null> {
    const query = 'SELECT * FROM exam_refraction WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertRefraction(refraction: Omit<Refraction, 'id'>): Promise<Refraction> {
    const query = `
      INSERT INTO exam_refraction (exam_form_id, right_eye_sphere, right_eye_cylinder, right_eye_axis, right_eye_add, left_eye_sphere, left_eye_cylinder, left_eye_axis, left_eye_add)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        right_eye_sphere = EXCLUDED.right_eye_sphere,
        right_eye_cylinder = EXCLUDED.right_eye_cylinder,
        right_eye_axis = EXCLUDED.right_eye_axis,
        right_eye_add = EXCLUDED.right_eye_add,
        left_eye_sphere = EXCLUDED.left_eye_sphere,
        left_eye_cylinder = EXCLUDED.left_eye_cylinder,
        left_eye_axis = EXCLUDED.left_eye_axis,
        left_eye_add = EXCLUDED.left_eye_add
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      refraction.exam_form_id,
      refraction.right_eye_sphere,
      refraction.right_eye_cylinder,
      refraction.right_eye_axis,
      refraction.right_eye_add,
      refraction.left_eye_sphere,
      refraction.left_eye_cylinder,
      refraction.left_eye_axis,
      refraction.left_eye_add
    ]);
    return result.rows[0];
  }

  // Slit Lamp methods
  async findSlitLamp(examFormId: number): Promise<SlitLamp | null> {
    const query = 'SELECT * FROM exam_slit_lamp WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertSlitLamp(slitLamp: Omit<SlitLamp, 'id'>): Promise<SlitLamp> {
    const query = `
      INSERT INTO exam_slit_lamp (exam_form_id, right_eye_anterior_segment, left_eye_anterior_segment, right_eye_cornea, left_eye_cornea, right_eye_iris, left_eye_iris, right_eye_lens, left_eye_lens)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        right_eye_anterior_segment = EXCLUDED.right_eye_anterior_segment,
        left_eye_anterior_segment = EXCLUDED.left_eye_anterior_segment,
        right_eye_cornea = EXCLUDED.right_eye_cornea,
        left_eye_cornea = EXCLUDED.left_eye_cornea,
        right_eye_iris = EXCLUDED.right_eye_iris,
        left_eye_iris = EXCLUDED.left_eye_iris,
        right_eye_lens = EXCLUDED.right_eye_lens,
        left_eye_lens = EXCLUDED.left_eye_lens
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      slitLamp.exam_form_id,
      slitLamp.right_eye_anterior_segment,
      slitLamp.left_eye_anterior_segment,
      slitLamp.right_eye_cornea,
      slitLamp.left_eye_cornea,
      slitLamp.right_eye_iris,
      slitLamp.left_eye_iris,
      slitLamp.right_eye_lens,
      slitLamp.left_eye_lens
    ]);
    return result.rows[0];
  }

  // Fundus methods
  async findFundus(examFormId: number): Promise<Fundus | null> {
    const query = 'SELECT * FROM exam_fundus WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertFundus(fundus: Omit<Fundus, 'id'>): Promise<Fundus> {
    const query = `
      INSERT INTO exam_fundus (exam_form_id, right_eye_retina, left_eye_retina, right_eye_optic_nerve, left_eye_optic_nerve, right_eye_macula, left_eye_macula, right_eye_vessels, left_eye_vessels)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        right_eye_retina = EXCLUDED.right_eye_retina,
        left_eye_retina = EXCLUDED.left_eye_retina,
        right_eye_optic_nerve = EXCLUDED.right_eye_optic_nerve,
        left_eye_optic_nerve = EXCLUDED.left_eye_optic_nerve,
        right_eye_macula = EXCLUDED.right_eye_macula,
        left_eye_macula = EXCLUDED.left_eye_macula,
        right_eye_vessels = EXCLUDED.right_eye_vessels,
        left_eye_vessels = EXCLUDED.left_eye_vessels
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      fundus.exam_form_id,
      fundus.right_eye_retina,
      fundus.left_eye_retina,
      fundus.right_eye_optic_nerve,
      fundus.left_eye_optic_nerve,
      fundus.right_eye_macula,
      fundus.left_eye_macula,
      fundus.right_eye_vessels,
      fundus.left_eye_vessels
    ]);
    return result.rows[0];
  }

  // Diagnosis methods
  async findDiagnosis(examFormId: number): Promise<Diagnosis | null> {
    const query = 'SELECT * FROM exam_diagnosis WHERE exam_form_id = $1';
    const result = await this.pool.query(query, [examFormId]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async upsertDiagnosis(diagnosis: Omit<Diagnosis, 'id'>): Promise<Diagnosis> {
    const query = `
      INSERT INTO exam_diagnosis (exam_form_id, primary_diagnosis, secondary_diagnosis, differential_diagnosis, treatment_plan, follow_up_plan)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (exam_form_id) DO UPDATE SET
        primary_diagnosis = EXCLUDED.primary_diagnosis,
        secondary_diagnosis = EXCLUDED.secondary_diagnosis,
        differential_diagnosis = EXCLUDED.differential_diagnosis,
        treatment_plan = EXCLUDED.treatment_plan,
        follow_up_plan = EXCLUDED.follow_up_plan
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      diagnosis.exam_form_id,
      diagnosis.primary_diagnosis,
      diagnosis.secondary_diagnosis,
      diagnosis.differential_diagnosis,
      diagnosis.treatment_plan,
      diagnosis.follow_up_plan
    ]);
    return result.rows[0];
  }
}
