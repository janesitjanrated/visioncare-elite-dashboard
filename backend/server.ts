import express from 'express';
import cors from 'cors';
import { pool, testConnection } from './postgres-client';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      res.json({ status: 'ok', message: 'Database connected successfully' });
    } else {
      res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Authentication endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email]);
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Insert new user
    const insertQuery = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(insertQuery, [email, password, name]);
    
    const user = result.rows[0];
    res.json({ 
      success: true, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Patients endpoints
app.get('/api/patients', async (req, res) => {
  try {
    const query = 'SELECT * FROM patients ORDER BY created_at DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const { name, email, phone, date_of_birth, address } = req.body;
    
    const query = `
      INSERT INTO patients (name, email, phone, date_of_birth, address) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, phone, date_of_birth, address]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, date_of_birth, address } = req.body;
    
    const query = `
      UPDATE patients 
      SET name = $1, email = $2, phone = $3, date_of_birth = $4, address = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, phone, date_of_birth, address, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM patients WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Appointments endpoints
app.get('/api/appointments', async (req, res) => {
  try {
    const query = `
      SELECT a.*, p.name as patient_name, p.phone as patient_phone
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      ORDER BY a.appointment_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { patient_id, appointment_date, notes, status } = req.body;
    
    const query = `
      INSERT INTO appointments (patient_id, appointment_date, notes, status) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await pool.query(query, [patient_id, appointment_date, notes, status]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, appointment_date, notes, status } = req.body;
    
    const query = `
      UPDATE appointments 
      SET patient_id = $1, appointment_date = $2, notes = $3, status = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 
      RETURNING *
    `;
    const result = await pool.query(query, [patient_id, appointment_date, notes, status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Inventory endpoints
app.get('/api/inventory', async (req, res) => {
  try {
    const query = 'SELECT * FROM inventory ORDER BY created_at DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, unit_price, category } = req.body;
    
    const query = `
      UPDATE inventory 
      SET name = $1, description = $2, quantity = $3, unit_price = $4, category = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, quantity, unit_price, category, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Orders endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const query = `
      SELECT o.*, p.name as patient_name, p.phone as patient_phone
      FROM orders o
      LEFT JOIN patients p ON o.patient_id = p.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, order_date, status, total_amount, notes } = req.body;
    
    const query = `
      UPDATE orders 
      SET patient_id = $1, order_date = $2, status = $3, total_amount = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `;
    const result = await pool.query(query, [patient_id, order_date, status, total_amount, notes, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Exam Forms endpoints
app.get('/api/exam-forms', async (req, res) => {
  try {
    const query = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      ORDER BY ef.exam_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Get exam forms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/exam-forms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get exam form with all related data
    const examFormQuery = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      WHERE ef.id = $1
    `;
    const examFormResult = await pool.query(examFormQuery, [id]);
    
    if (examFormResult.rows.length === 0) {
      return res.status(404).json({ message: 'Exam form not found' });
    }
    
    const examForm = examFormResult.rows[0];
    
    // Get patient info
    const patientInfoQuery = 'SELECT * FROM exam_patient_info WHERE exam_form_id = $1';
    const patientInfoResult = await pool.query(patientInfoQuery, [id]);
    
    // Get visual acuity
    const visualAcuityQuery = 'SELECT * FROM exam_visual_acuity WHERE exam_form_id = $1';
    const visualAcuityResult = await pool.query(visualAcuityQuery, [id]);
    
    // Get refraction
    const refractionQuery = 'SELECT * FROM exam_refraction WHERE exam_form_id = $1';
    const refractionResult = await pool.query(refractionQuery, [id]);
    
    // Get slit lamp
    const slitLampQuery = 'SELECT * FROM exam_slit_lamp WHERE exam_form_id = $1';
    const slitLampResult = await pool.query(slitLampQuery, [id]);
    
    // Get fundus
    const fundusQuery = 'SELECT * FROM exam_fundus WHERE exam_form_id = $1';
    const fundusResult = await pool.query(fundusQuery, [id]);
    
    // Get diagnosis
    const diagnosisQuery = 'SELECT * FROM exam_diagnosis WHERE exam_form_id = $1';
    const diagnosisResult = await pool.query(diagnosisQuery, [id]);
    
    const examData = {
      ...examForm,
      patient_info: patientInfoResult.rows[0] || null,
      visual_acuity: visualAcuityResult.rows[0] || null,
      refraction: refractionResult.rows[0] || null,
      slit_lamp: slitLampResult.rows[0] || null,
      fundus: fundusResult.rows[0] || null,
      diagnosis: diagnosisResult.rows[0] || null
    };
    
    res.json(examData);
  } catch (error) {
    console.error('Get exam form error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/exam-forms/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    const query = `
      SELECT ef.*, p.name as patient_name, p.phone as patient_phone, u.name as doctor_name
      FROM exam_forms ef
      LEFT JOIN patients p ON ef.patient_id = p.id
      LEFT JOIN users u ON ef.doctor_id = u.id
      WHERE ef.patient_id = $1
      ORDER BY ef.exam_date DESC
    `;
    const result = await pool.query(query, [patientId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Get patient exam forms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/exam-forms', async (req, res) => {
  try {
    const { patient_id, doctor_id, exam_date, status } = req.body;
    
    const query = `
      INSERT INTO exam_forms (patient_id, doctor_id, exam_date, status) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await pool.query(query, [patient_id, doctor_id, exam_date, status]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create exam form error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/exam-forms/:id/patient-info', async (req, res) => {
  try {
    const { id } = req.params;
    const { chief_complaint, present_illness, past_medical_history, family_history, social_history, medications, allergies } = req.body;
    
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
    const result = await pool.query(query, [id, chief_complaint, present_illness, past_medical_history, family_history, social_history, medications, allergies]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update patient info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/exam-forms/:id/visual-acuity', async (req, res) => {
  try {
    const { id } = req.params;
    const { right_eye_unaided, left_eye_unaided, right_eye_aided, left_eye_aided, right_eye_pinhole, left_eye_pinhole } = req.body;
    
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
    const result = await pool.query(query, [id, right_eye_unaided, left_eye_unaided, right_eye_aided, left_eye_aided, right_eye_pinhole, left_eye_pinhole]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update visual acuity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/exam-forms/:id/refraction', async (req, res) => {
  try {
    const { id } = req.params;
    const { right_eye_sphere, right_eye_cylinder, right_eye_axis, right_eye_add, left_eye_sphere, left_eye_cylinder, left_eye_axis, left_eye_add } = req.body;
    
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
    const result = await pool.query(query, [id, right_eye_sphere, right_eye_cylinder, right_eye_axis, right_eye_add, left_eye_sphere, left_eye_cylinder, left_eye_axis, left_eye_add]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update refraction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/exam-forms/:id/diagnosis', async (req, res) => {
  try {
    const { id } = req.params;
    const { primary_diagnosis, secondary_diagnosis, differential_diagnosis, treatment_plan, follow_up_plan } = req.body;
    
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
    const result = await pool.query(query, [id, primary_diagnosis, secondary_diagnosis, differential_diagnosis, treatment_plan, follow_up_plan]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update diagnosis error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 