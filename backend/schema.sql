-- Create database (run this first)
-- CREATE DATABASE visualDB;

-- Connect to the database
-- \c visualDB;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Forms table
CREATE TABLE IF NOT EXISTS exam_forms (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE SET NULL,
    exam_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    doctor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient Info Section
CREATE TABLE IF NOT EXISTS exam_patient_info (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    chief_complaint TEXT,
    present_illness TEXT,
    past_medical_history TEXT,
    family_history TEXT,
    social_history TEXT,
    medications TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visual Acuity Section
CREATE TABLE IF NOT EXISTS exam_visual_acuity (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    right_eye_unaided VARCHAR(20),
    left_eye_unaided VARCHAR(20),
    right_eye_aided VARCHAR(20),
    left_eye_aided VARCHAR(20),
    right_eye_pinhole VARCHAR(20),
    left_eye_pinhole VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refraction Section
CREATE TABLE IF NOT EXISTS exam_refraction (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    right_eye_sphere DECIMAL(4,2),
    right_eye_cylinder DECIMAL(4,2),
    right_eye_axis INTEGER,
    right_eye_add DECIMAL(4,2),
    left_eye_sphere DECIMAL(4,2),
    left_eye_cylinder DECIMAL(4,2),
    left_eye_axis INTEGER,
    left_eye_add DECIMAL(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slit Lamp Section
CREATE TABLE IF NOT EXISTS exam_slit_lamp (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    right_eye_anterior_segment TEXT,
    left_eye_anterior_segment TEXT,
    right_eye_cornea TEXT,
    left_eye_cornea TEXT,
    right_eye_iris TEXT,
    left_eye_iris TEXT,
    right_eye_lens TEXT,
    left_eye_lens TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fundus Exam Section
CREATE TABLE IF NOT EXISTS exam_fundus (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    right_eye_retina TEXT,
    left_eye_retina TEXT,
    right_eye_optic_nerve TEXT,
    left_eye_optic_nerve TEXT,
    right_eye_macula TEXT,
    left_eye_macula TEXT,
    right_eye_vessels TEXT,
    left_eye_vessels TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diagnosis Section
CREATE TABLE IF NOT EXISTS exam_diagnosis (
    id SERIAL PRIMARY KEY,
    exam_form_id INTEGER REFERENCES exam_forms(id) ON DELETE CASCADE UNIQUE,
    primary_diagnosis TEXT,
    secondary_diagnosis TEXT,
    differential_diagnosis TEXT,
    treatment_plan TEXT,
    follow_up_plan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    salary DECIMAL(10,2),
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    unit_price DECIMAL(10,2),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE SET NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    inventory_id INTEGER REFERENCES inventory(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (email, password, name) VALUES 
('admin@clinic.com', 'admin123', 'Admin User'),
('doctor@clinic.com', 'doctor123', 'Dr. Smith');

INSERT INTO patients (name, email, phone, date_of_birth, address) VALUES 
('John Doe', 'john@example.com', '0812345678', '1990-01-15', '123 Main St, Bangkok'),
('Jane Smith', 'jane@example.com', '0898765432', '1985-05-20', '456 Oak Ave, Chiang Mai'),
('Somchai Jaidee', 'somchai@example.com', '0811111111', '1975-03-10', '789 Sukhumvit Rd, Bangkok'),
('Naree Wong', 'naree@example.com', '0822222222', '1988-07-25', '321 Silom Rd, Bangkok');

INSERT INTO employees (name, email, phone, position, salary, hire_date) VALUES 
('Dr. Somchai', 'somchai@clinic.com', '0811111111', 'Ophthalmologist', 80000.00, '2023-01-15'),
('Nurse Naree', 'naree@clinic.com', '0822222222', 'Nurse', 35000.00, '2023-02-01');

INSERT INTO inventory (name, description, quantity, unit_price, category) VALUES 
('Contact Lenses', 'Daily disposable contact lenses', 100, 150.00, 'Lenses'),
('Eye Drops', 'Artificial tears eye drops', 50, 80.00, 'Medication'),
('Glasses Frames', 'Metal frame glasses', 30, 1200.00, 'Frames');

-- Insert sample exam forms
INSERT INTO exam_forms (patient_id, doctor_id, exam_date, status) VALUES 
(1, 2, '2024-01-15 09:00:00', 'completed'),
(2, 2, '2024-01-16 10:30:00', 'completed'),
(3, 2, '2024-01-17 14:00:00', 'completed'),
(4, 2, '2024-01-18 11:15:00', 'completed');

-- Insert sample patient info
INSERT INTO exam_patient_info (exam_form_id, chief_complaint, present_illness, past_medical_history) VALUES 
(1, 'Blurred vision in right eye', 'Patient reports gradual vision loss over 6 months', 'No significant medical history'),
(2, 'Eye strain and headaches', 'Patient works long hours on computer', 'Mild myopia diagnosed 5 years ago'),
(3, 'Redness and irritation in left eye', 'Started 2 days ago, worse in morning', 'Seasonal allergies'),
(4, 'Difficulty reading small print', 'Progressive difficulty with near vision', 'No previous eye problems');

-- Insert sample visual acuity
INSERT INTO exam_visual_acuity (exam_form_id, right_eye_unaided, left_eye_unaided, right_eye_aided, left_eye_aided) VALUES 
(1, '20/200', '20/40', '20/20', '20/20'),
(2, '20/100', '20/100', '20/20', '20/20'),
(3, '20/20', '20/60', '20/20', '20/20'),
(4, '20/30', '20/30', '20/20', '20/20');

-- Insert sample refraction
INSERT INTO exam_refraction (exam_form_id, right_eye_sphere, right_eye_cylinder, right_eye_axis, left_eye_sphere, left_eye_cylinder, left_eye_axis) VALUES 
(1, -2.50, -0.75, 90, -1.25, -0.50, 85),
(2, -3.00, -1.00, 95, -2.75, -0.75, 90),
(3, +0.25, 0.00, 0, +1.50, -0.25, 180),
(4, +1.75, 0.00, 0, +1.50, 0.00, 0);

-- Insert sample slit lamp findings
INSERT INTO exam_slit_lamp (exam_form_id, right_eye_anterior_segment, left_eye_anterior_segment, right_eye_cornea, left_eye_cornea) VALUES 
(1, 'Normal', 'Normal', 'Clear', 'Clear'),
(2, 'Normal', 'Normal', 'Clear', 'Clear'),
(3, 'Normal', 'Conjunctival injection', 'Clear', 'Clear'),
(4, 'Normal', 'Normal', 'Clear', 'Clear');

-- Insert sample fundus findings
INSERT INTO exam_fundus (exam_form_id, right_eye_retina, left_eye_retina, right_eye_optic_nerve, left_eye_optic_nerve) VALUES 
(1, 'Normal', 'Normal', 'Pink, well-defined', 'Pink, well-defined'),
(2, 'Normal', 'Normal', 'Pink, well-defined', 'Pink, well-defined'),
(3, 'Normal', 'Normal', 'Pink, well-defined', 'Pink, well-defined'),
(4, 'Normal', 'Normal', 'Pink, well-defined', 'Pink, well-defined');

-- Insert sample diagnosis
INSERT INTO exam_diagnosis (exam_form_id, primary_diagnosis, treatment_plan, follow_up_plan) VALUES 
(1, 'Cataract, right eye', 'Surgical removal of cataract', 'Follow up in 1 month'),
(2, 'Myopia', 'Prescription glasses', 'Annual eye exam'),
(3, 'Allergic conjunctivitis', 'Antihistamine eye drops', 'Follow up in 1 week'),
(4, 'Presbyopia', 'Reading glasses', 'Annual eye exam');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_orders_patient_id ON orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_exam_forms_patient_id ON exam_forms(patient_id);
CREATE INDEX IF NOT EXISTS idx_exam_forms_date ON exam_forms(exam_date); 