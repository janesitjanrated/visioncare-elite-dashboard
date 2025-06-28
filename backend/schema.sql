-- VisionCare Elite Dashboard Database Schema
-- Generated from database.csv structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom enums
CREATE TYPE appointment_status_enum AS ENUM ('booked', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE entity_status_enum AS ENUM ('active', 'inactive', 'suspended', 'deleted');
CREATE TYPE glasses_status_enum AS ENUM ('ordered', 'assembling', 'ready', 'delivered', 'cancelled');
CREATE TYPE lens_status_enum AS ENUM ('ordered', 'in_progress', 'arrived', 'assembled', 'delivered', 'cancelled');
CREATE TYPE lens_claim_status_enum AS ENUM ('pending', 'approved', 'rejected', 'completed');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed', 'refunded', 'cancelled');
CREATE TYPE subscription_plan_enum AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE tenant_payment_status_enum AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
CREATE TYPE treatment_status_enum AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE vendor_claim_cycle_status_enum AS ENUM ('open', 'submitted', 'approved', 'paid', 'closed');
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE customer_note_type_enum AS ENUM ('general', 'medical', 'billing', 'follow_up');

-- Create tables
CREATE TABLE tenant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subscription_plan subscription_plan_enum DEFAULT 'free',
    status entity_status_enum DEFAULT 'active',
    payment_status tenant_payment_status_enum DEFAULT 'pending',
    plan_started_at TIMESTAMP WITHOUT TIME ZONE,
    plan_expires_at TIMESTAMP WITHOUT TIME ZONE,
    last_payment_at TIMESTAMP WITHOUT TIME ZONE,
    next_billing_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE branch (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    name TEXT NOT NULL,
    address TEXT,
    province TEXT,
    status entity_status_enum DEFAULT 'active',
    is_deleted BOOLEAN DEFAULT false,
    UNIQUE(tenant_id, name)
);

CREATE TABLE user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT,
    last_login TIMESTAMP WITHOUT TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE permission (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE role_permission (
    role_id UUID REFERENCES role(id),
    permission_id UUID REFERENCES permission(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_tenant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    tenant_id UUID REFERENCES tenant(id),
    role_id UUID REFERENCES role(id),
    status TEXT DEFAULT 'active',
    joined_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    UNIQUE(user_id, tenant_id)
);

CREATE TABLE user_branch_assign (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    branch_id UUID REFERENCES branch(id),
    position TEXT,
    permission_level TEXT DEFAULT 'staff',
    UNIQUE(user_id, branch_id)
);

CREATE TABLE customer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    name TEXT,
    phone TEXT,
    email TEXT NOT NULL,
    dob DATE,
    gender gender_enum,
    address TEXT,
    emergency_contact TEXT,
    medical_history TEXT,
    allergies TEXT,
    segment TEXT,
    created_by UUID REFERENCES user(id),
    updated_by UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP WITHOUT TIME ZONE,
    is_deleted BOOLEAN DEFAULT false,
    UNIQUE(tenant_id, phone),
    UNIQUE(tenant_id, name)
);

CREATE TABLE doctor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id) UNIQUE,
    branch_id UUID REFERENCES branch(id),
    specialization TEXT,
    license_number TEXT,
    status entity_status_enum DEFAULT 'active',
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE appointment_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    name TEXT,
    description TEXT,
    duration_minutes INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    branch_id UUID REFERENCES branch(id),
    doctor_id UUID REFERENCES doctor(id),
    type_id UUID REFERENCES appointment_type(id),
    status appointment_status_enum DEFAULT 'booked',
    scheduled_at TIMESTAMP WITHOUT TIME ZONE,
    duration_minutes INTEGER,
    notes TEXT,
    external_ref TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE doctor_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctor(id),
    branch_id UUID REFERENCES branch(id),
    day_of_week INTEGER,
    start_time TIME WITHOUT TIME ZONE,
    end_time TIME WITHOUT TIME ZONE,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    UNIQUE(doctor_id, day_of_week, start_time, end_time)
);

CREATE TABLE branch_slot_template (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID REFERENCES branch(id),
    day_of_week INTEGER,
    total_slot INTEGER NOT NULL
);

CREATE TABLE service_category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    name TEXT NOT NULL,
    description TEXT,
    status entity_status_enum DEFAULT 'active',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE service (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES service_category(id),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC,
    duration_minutes INTEGER,
    status entity_status_enum DEFAULT 'active',
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE product_cost (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES service(id),
    branch_id UUID REFERENCES branch(id),
    cost_price NUMERIC NOT NULL,
    effective_date TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    UNIQUE(service_id, branch_id, effective_date)
);

CREATE TABLE payment_method (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    description TEXT,
    gateway_identifier TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE invoice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    branch_id UUID REFERENCES branch(id),
    total_amount NUMERIC,
    vat_amount NUMERIC DEFAULT 0,
    is_vat_included BOOLEAN DEFAULT true,
    payment_status payment_status_enum,
    payment_method_id UUID REFERENCES payment_method(id),
    external_ref TEXT,
    income_category TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE invoice_item (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoice(id),
    service_id UUID REFERENCES service(id),
    quantity INTEGER,
    unit_price NUMERIC,
    total_price NUMERIC,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE treatment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    service_id UUID REFERENCES service(id),
    branch_id UUID REFERENCES branch(id),
    doctor_id UUID REFERENCES doctor(id),
    treatment_date TIMESTAMP WITHOUT TIME ZONE,
    notes TEXT,
    status treatment_status_enum DEFAULT 'completed',
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE lens_unit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    invoice_item_id UUID REFERENCES invoice_item(id),
    prescription_left TEXT,
    prescription_right TEXT,
    lens_model TEXT,
    order_type TEXT DEFAULT 'normal',
    vendor_name TEXT,
    current_status lens_status_enum DEFAULT 'ordered',
    expected_arrival DATE,
    arrived_at TIMESTAMP WITHOUT TIME ZONE,
    assembled_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE glasses_unit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    branch_id UUID REFERENCES branch(id),
    frame_product_id UUID,
    lens_left_id UUID REFERENCES lens_unit(id),
    lens_right_id UUID REFERENCES lens_unit(id),
    status glasses_status_enum DEFAULT 'assembling',
    assembled_at TIMESTAMP WITHOUT TIME ZONE,
    delivered_at TIMESTAMP WITHOUT TIME ZONE,
    notified_at TIMESTAMP WITHOUT TIME ZONE,
    created_by UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE lens_claim_request (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    lens_unit_id UUID REFERENCES lens_unit(id),
    customer_id UUID REFERENCES customer(id),
    reason TEXT,
    claim_date DATE DEFAULT CURRENT_DATE,
    refund_amount NUMERIC,
    vendor_response TEXT,
    status lens_claim_status_enum DEFAULT 'pending',
    created_by UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE expense (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    category TEXT,
    expense_type TEXT,
    amount NUMERIC NOT NULL,
    paid_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    description TEXT,
    created_by UUID REFERENCES user(id)
);

CREATE TABLE expense_recurring (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    name TEXT,
    amount NUMERIC,
    due_day INTEGER,
    category TEXT,
    auto_notify BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE asset (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    name TEXT,
    value NUMERIC,
    acquired_at TIMESTAMP WITHOUT TIME ZONE,
    status entity_status_enum DEFAULT 'active'
);

CREATE TABLE liability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    name TEXT,
    value NUMERIC,
    due_date DATE,
    status entity_status_enum DEFAULT 'active'
);

CREATE TABLE equity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    value NUMERIC,
    source TEXT,
    recorded_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE business_loan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    lender_name TEXT NOT NULL,
    loan_amount NUMERIC NOT NULL,
    interest_rate DOUBLE PRECISION DEFAULT 0,
    start_date DATE,
    due_date DATE,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE loan_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loan_id UUID REFERENCES business_loan(id),
    due_date DATE,
    principal NUMERIC,
    interest NUMERIC,
    total_payment NUMERIC,
    paid BOOLEAN DEFAULT false,
    paid_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE employee_salary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    base_salary NUMERIC NOT NULL,
    bonus NUMERIC DEFAULT 0,
    payroll_date DATE NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE staff_attendance_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    branch_id UUID REFERENCES branch(id),
    date DATE,
    type TEXT,
    hours DOUBLE PRECISION,
    reason TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE owner_withdrawal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES user(id),
    amount NUMERIC NOT NULL,
    type TEXT DEFAULT 'personal',
    reason TEXT,
    withdrawn_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE purchase_invoice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_name TEXT,
    amount NUMERIC,
    vat NUMERIC,
    total NUMERIC,
    paid_at TIMESTAMP WITHOUT TIME ZONE,
    branch_id UUID REFERENCES branch(id),
    external_ref TEXT,
    created_by UUID REFERENCES user(id)
);

CREATE TABLE withholding_tax (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payer_id UUID REFERENCES user(id),
    payee_name TEXT,
    amount NUMERIC,
    tax_percent DOUBLE PRECISION,
    tax_amount NUMERIC,
    payment_date DATE,
    document_ref TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE cash_snapshot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    date DATE NOT NULL,
    cash_on_hand NUMERIC NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE balance_sheet_summary (
    tenant_id UUID REFERENCES tenant(id),
    total_assets NUMERIC,
    total_liabilities NUMERIC,
    total_equity NUMERIC
);

CREATE TABLE kpi_snapshot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    week_start DATE,
    revenue NUMERIC,
    cost NUMERIC,
    utilization_percent DOUBLE PRECISION,
    no_show_percent DOUBLE PRECISION,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE course_category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    name TEXT,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE course_package (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES course_category(id),
    name TEXT,
    description TEXT,
    price NUMERIC,
    total_session INTEGER,
    validity_days INTEGER,
    status entity_status_enum DEFAULT 'active',
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE course_service (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID REFERENCES course_package(id),
    service_id UUID REFERENCES service(id),
    required_sessions INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE customer_course (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    package_id UUID REFERENCES course_package(id),
    branch_id UUID REFERENCES branch(id),
    purchased_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    start_date DATE,
    end_date DATE,
    remaining_sessions INTEGER,
    status entity_status_enum DEFAULT 'active',
    transaction_id TEXT,
    notes TEXT,
    created_by UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE customer_note (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    created_by UUID REFERENCES user(id),
    type customer_note_type_enum,
    content TEXT,
    sentiment_score DOUBLE PRECISION,
    keyword_tag TEXT[],
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE follow_up_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    method TEXT,
    staff_id UUID REFERENCES user(id),
    result TEXT,
    note TEXT,
    next_follow_date DATE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE invoice_follow_up (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoice(id),
    follow_up_date DATE NOT NULL,
    result TEXT,
    note TEXT,
    staff_id UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE crm_task_assign (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    assigned_to UUID REFERENCES user(id),
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'open',
    due_date DATE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE campaign_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    campaign_name TEXT,
    sent_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    channel TEXT,
    result TEXT
);

CREATE TABLE vendor_claim_cycle (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    vendor_name TEXT,
    cycle_code TEXT,
    start_date DATE,
    end_date DATE,
    total_claim_amount NUMERIC,
    status vendor_claim_cycle_status_enum DEFAULT 'open',
    refund_expected_date DATE,
    refund_received_date DATE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    action TEXT,
    module TEXT,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE ai_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user(id),
    prompt TEXT,
    gpt_response TEXT,
    module TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE chat_integration_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    platform TEXT,
    channel_id TEXT,
    access_token TEXT,
    secret_key TEXT,
    webhook_url TEXT,
    config_json JSONB,
    active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES user(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE chat_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    branch_id UUID REFERENCES branch(id),
    platform TEXT,
    sender TEXT,
    receiver TEXT,
    message TEXT,
    is_bot BOOLEAN,
    is_fallback BOOLEAN,
    received_at TIMESTAMP WITHOUT TIME ZONE,
    responded_at TIMESTAMP WITHOUT TIME ZONE,
    response_time_secs INTEGER
);

CREATE TABLE onboarding_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    step TEXT,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE tenant_config_flag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenant(id),
    flag TEXT,
    value BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_customer_tenant_id ON customer(tenant_id);
CREATE INDEX idx_customer_phone ON customer(phone);
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_appointment_customer_id ON appointment(customer_id);
CREATE INDEX idx_appointment_branch_id ON appointment(branch_id);
CREATE INDEX idx_appointment_scheduled_at ON appointment(scheduled_at);
CREATE INDEX idx_invoice_customer_id ON invoice(customer_id);
CREATE INDEX idx_invoice_branch_id ON invoice(branch_id);
CREATE INDEX idx_expense_tenant_id ON expense(tenant_id);
CREATE INDEX idx_expense_branch_id ON expense(branch_id);
CREATE INDEX idx_user_tenant_user_id ON user_tenant(user_id);
CREATE INDEX idx_user_tenant_tenant_id ON user_tenant(tenant_id);
CREATE INDEX idx_user_branch_assign_user_id ON user_branch_assign(user_id);
CREATE INDEX idx_user_branch_assign_branch_id ON user_branch_assign(branch_id);

-- Insert default data
INSERT INTO role (name, description) VALUES 
('admin', 'System administrator with full access'),
('manager', 'Branch manager with limited administrative access'),
('staff', 'Regular staff member'),
('doctor', 'Medical professional');

INSERT INTO permission (name, description) VALUES 
('read_patients', 'View patient information'),
('write_patients', 'Create and edit patient records'),
('read_appointments', 'View appointment schedules'),
('write_appointments', 'Create and edit appointments'),
('read_finance', 'View financial reports'),
('write_finance', 'Manage financial records'),
('read_inventory', 'View inventory status'),
('write_inventory', 'Manage inventory'),
('read_reports', 'View system reports'),
('write_reports', 'Generate and export reports'),
('manage_users', 'Manage user accounts and permissions'),
('manage_settings', 'Manage system settings');

-- Link admin role to all permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM role r, permission p 
WHERE r.name = 'admin';

-- Link manager role to most permissions (except user management)
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM role r, permission p 
WHERE r.name = 'manager' AND p.name != 'manage_users';

-- Link staff role to basic permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM role r, permission p 
WHERE r.name = 'staff' AND p.name IN ('read_patients', 'write_patients', 'read_appointments', 'write_appointments', 'read_inventory');

-- Link doctor role to medical permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM role r, permission p 
WHERE r.name = 'doctor' AND p.name IN ('read_patients', 'write_patients', 'read_appointments', 'write_appointments', 'read_reports');

INSERT INTO payment_method (name, description) VALUES 
('Cash', 'Cash payment'),
('Credit Card', 'Credit card payment'),
('Bank Transfer', 'Bank transfer payment'),
('Mobile Banking', 'Mobile banking payment'),
('Cheque', 'Cheque payment');
