-- Complete database setup with indexes and constraints

-- Organization table (already exists but adding indexes)
CREATE INDEX IF NOT EXISTS idx_organization_status ON organization(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_organization_created_at ON organization(created_at);

-- Branch table (already exists but adding indexes)  
CREATE INDEX IF NOT EXISTS idx_branch_status ON branch(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_branch_coordinates ON branch USING GIN (coordinates);
CREATE INDEX IF NOT EXISTS idx_branch_created_at ON branch(created_at);

-- Staff table (already exists but adding indexes)
CREATE INDEX IF NOT EXISTS idx_staff_email ON staff(email) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_staff_status ON staff(org_id, branch_id) WHERE deleted_at IS NULL;

-- Patient table (already exists but adding indexes)
CREATE INDEX IF NOT EXISTS idx_patient_email ON patient(email) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_patient_phone ON patient(phone) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_patient_status ON patient(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_patient_dob ON patient(date_of_birth);
CREATE INDEX IF NOT EXISTS idx_patient_gender ON patient(gender);
CREATE INDEX IF NOT EXISTS idx_patient_search ON patient USING gin(to_tsvector('english', name || ' ' || COALESCE(email, '') || ' ' || COALESCE(phone, '')));

-- Appointment table (already exists but adding indexes)
CREATE INDEX IF NOT EXISTS idx_appointment_date ON appointment(date) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_appointment_status ON appointment(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_appointment_type ON appointment(type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_appointment_staff_date ON appointment(staff_id, date) WHERE deleted_at IS NULL;

-- Prescription table (already exists but adding indexes)
CREATE INDEX IF NOT EXISTS idx_prescription_date ON prescription(date) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prescription_type ON prescription(type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prescription_staff ON prescription(staff_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prescription_data ON prescription USING GIN (data);

-- Create additional tables for complete clinic management

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_record (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'consultation', 'examination', 'treatment', 'follow_up'
  diagnosis TEXT,
  symptoms TEXT,
  treatment_plan TEXT,
  medications JSONB,
  vital_signs JSONB,
  exam_data JSONB,
  visit_date TIMESTAMPTZ NOT NULL,
  next_appointment TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_medical_record_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_medical_record_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);

CREATE INDEX idx_medical_record_patient ON medical_record(patient_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_medical_record_visit_date ON medical_record(visit_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_medical_record_type ON medical_record(type) WHERE deleted_at IS NULL;
CREATE INDEX idx_medical_record_staff ON medical_record(staff_id) WHERE deleted_at IS NULL;

-- Inventory Categories table
CREATE TABLE IF NOT EXISTS inventory_category (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_category_org FOREIGN KEY(org_id) REFERENCES organization(id)
);

CREATE INDEX idx_inventory_category_org ON inventory_category(org_id) WHERE deleted_at IS NULL;

-- Inventory Products table
CREATE TABLE IF NOT EXISTS inventory_product (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  category_id UUID,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sku VARCHAR(50) UNIQUE NOT NULL,
  barcode VARCHAR(100),
  unit VARCHAR(20) NOT NULL, -- 'piece', 'box', 'bottle', 'ml', 'mg'
  cost_price DECIMAL(10,2),
  selling_price DECIMAL(10,2),
  min_stock_level INTEGER DEFAULT 0,
  max_stock_level INTEGER DEFAULT 0,
  reorder_point INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_product_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_product_category FOREIGN KEY(category_id) REFERENCES inventory_category(id)
);

CREATE INDEX idx_inventory_product_org ON inventory_product(org_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_product_category ON inventory_product(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_product_sku ON inventory_product(sku) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_product_barcode ON inventory_product(barcode) WHERE deleted_at IS NULL;

-- Inventory Stock table
CREATE TABLE IF NOT EXISTS inventory_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  current_quantity INTEGER DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  available_quantity INTEGER GENERATED ALWAYS AS (current_quantity - reserved_quantity) STORED,
  location VARCHAR(100), -- 'Storage Room A', 'Pharmacy', etc.
  batch_number VARCHAR(50),
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_stock_product FOREIGN KEY(product_id) REFERENCES inventory_product(id),
  CONSTRAINT fk_stock_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);

CREATE INDEX idx_inventory_stock_product ON inventory_stock(product_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_stock_branch ON inventory_stock(branch_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_stock_expiry ON inventory_stock(expiry_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_stock_quantity ON inventory_stock(current_quantity) WHERE deleted_at IS NULL;

-- Financial Transactions table
CREATE TABLE IF NOT EXISTS financial_transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'income', 'expense', 'payment', 'refund'
  category VARCHAR(50), -- 'consultation', 'medication', 'equipment', 'salary'
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  reference_type VARCHAR(50), -- 'appointment', 'prescription', 'inventory'
  reference_id UUID,
  payment_method VARCHAR(30), -- 'cash', 'card', 'transfer', 'insurance'
  staff_id UUID,
  patient_id UUID,
  transaction_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_transaction_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_transaction_branch FOREIGN KEY(branch_id) REFERENCES branch(id),
  CONSTRAINT fk_transaction_staff FOREIGN KEY(staff_id) REFERENCES staff(id),
  CONSTRAINT fk_transaction_patient FOREIGN KEY(patient_id) REFERENCES patient(id)
);

CREATE INDEX idx_financial_transaction_org ON financial_transaction(org_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_transaction_branch ON financial_transaction(branch_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_transaction_date ON financial_transaction(transaction_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_transaction_type ON financial_transaction(type) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_transaction_category ON financial_transaction(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_financial_transaction_reference ON financial_transaction(reference_type, reference_id) WHERE deleted_at IS NULL;

-- Community Posts table
CREATE TABLE IF NOT EXISTS community_post (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  post_type VARCHAR(30) DEFAULT 'general', -- 'announcement', 'tip', 'case_study', 'question'
  tags JSONB,
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_community_post_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_community_post_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);

CREATE INDEX idx_community_post_org ON community_post(org_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_community_post_staff ON community_post(staff_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_community_post_created ON community_post(created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_community_post_type ON community_post(post_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_community_post_tags ON community_post USING GIN (tags);

-- Loans table for financial management
CREATE TABLE IF NOT EXISTS loan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID,
  borrower_type VARCHAR(20) NOT NULL, -- 'staff', 'patient', 'supplier'
  borrower_id UUID NOT NULL,
  loan_amount DECIMAL(12,2) NOT NULL,
  remaining_amount DECIMAL(12,2) NOT NULL,
  interest_rate DECIMAL(5,2) DEFAULT 0,
  loan_term_months INTEGER,
  monthly_payment DECIMAL(10,2),
  start_date DATE NOT NULL,
  due_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'overdue', 'cancelled'
  purpose TEXT,
  collateral_description TEXT,
  approved_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_loan_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_loan_branch FOREIGN KEY(branch_id) REFERENCES branch(id),
  CONSTRAINT fk_loan_approved_by FOREIGN KEY(approved_by) REFERENCES staff(id)
);

CREATE INDEX idx_loan_org ON loan(org_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_loan_borrower ON loan(borrower_type, borrower_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_loan_status ON loan(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_loan_due_date ON loan(due_date) WHERE deleted_at IS NULL;

-- Insert sample data for testing
INSERT INTO organization (name, status) VALUES 
('Clinic Demo', 'active')
ON CONFLICT DO NOTHING;

-- Get the organization ID for sample data
DO $$
DECLARE
    org_uuid UUID;
    branch_uuid UUID;
    staff_uuid UUID;
BEGIN
    SELECT id INTO org_uuid FROM organization WHERE name = 'Clinic Demo' LIMIT 1;
    
    IF org_uuid IS NOT NULL THEN
        -- Insert sample branch
        INSERT INTO branch (org_id, name, address, status) VALUES 
        (org_uuid, 'Main Branch', '123 Health Street, Medical District', 'active')
        ON CONFLICT DO NOTHING;
        
        SELECT id INTO branch_uuid FROM branch WHERE org_id = org_uuid LIMIT 1;
        
        IF branch_uuid IS NOT NULL THEN
            -- Insert sample staff
            INSERT INTO staff (org_id, branch_id, name, email, role, password_hash) VALUES 
            (org_uuid, branch_uuid, 'Dr. Admin', 'admin@clinic.com', 'owner', '$2b$10$example_hash_for_demo_password')
            ON CONFLICT (email) DO NOTHING;
            
            -- Insert sample inventory category
            INSERT INTO inventory_category (org_id, name, description) VALUES 
            (org_uuid, 'Medications', 'Pharmaceutical products and medicines'),
            (org_uuid, 'Equipment', 'Medical equipment and tools'),
            (org_uuid, 'Supplies', 'General medical supplies')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;
END $$;