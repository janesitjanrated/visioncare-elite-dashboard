# Production Backend Full Spec

---

## Patient Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE patient (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  status VARCHAR(20) DEFAULT 'active',
  photo TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX idx_patient_org ON patient(org_id);
CREATE INDEX idx_patient_branch ON patient(branch_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/patients:
  get:
    summary: Get patient list
    parameters:
      - in: query
        name: page
        schema: { type: integer, default: 1 }
      - in: query
        name: pageSize
        schema: { type: integer, default: 20 }
      - in: query
        name: search
        schema: { type: string }
      - in: query
        name: status
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    patients:
                      type: array
                      items:
                        $ref: '#/components/schemas/Patient'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create patient
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PatientCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatientResponse'

/patients/{id}:
  get:
    summary: Get patient by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatientResponse'
  patch:
    summary: Update patient
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PatientUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatientResponse'
  delete:
    summary: Soft delete patient
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Patient:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        branch_id: { type: string }
        name: { type: string }
        email: { type: string }
        phone: { type: string }
        date_of_birth: { type: string, format: date }
        gender: { type: string }
        status: { type: string }
        photo: { type: string }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    PatientCreate:
      type: object
      required: [org_id, branch_id, name]
      properties:
        org_id: { type: string }
        branch_id: { type: string }
        name: { type: string }
        email: { type: string }
        phone: { type: string }
        date_of_birth: { type: string, format: date }
        gender: { type: string }
        status: { type: string }
        photo: { type: string }
    PatientUpdate:
      type: object
      properties:
        name: { type: string }
        email: { type: string }
        phone: { type: string }
        date_of_birth: { type: string, format: date }
        gender: { type: string }
        status: { type: string }
        photo: { type: string }
    PatientResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Patient'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Patient Table Migration
CREATE TABLE IF NOT EXISTS patient (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  status VARCHAR(20) DEFAULT 'active',
  photo TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX IF NOT EXISTS idx_patient_org ON patient(org_id);
CREATE INDEX IF NOT EXISTS idx_patient_branch ON patient(branch_id);
```

---

## Appointment Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE appointment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  type VARCHAR(50),
  date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX idx_appointment_patient ON appointment(patient_id);
CREATE INDEX idx_appointment_branch ON appointment(branch_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/appointments:
  get:
    summary: Get appointment list
    parameters:
      - in: query
        name: patientId
        schema: { type: string }
      - in: query
        name: date
        schema: { type: string, format: date }
      - in: query
        name: status
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    appointments:
                      type: array
                      items:
                        $ref: '#/components/schemas/Appointment'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create appointment
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/AppointmentCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AppointmentResponse'

/appointments/{id}:
  get:
    summary: Get appointment by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AppointmentResponse'
  patch:
    summary: Update appointment
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/AppointmentUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AppointmentResponse'
  delete:
    summary: Soft delete appointment
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Appointment:
      type: object
      properties:
        id: { type: string }
        patient_id: { type: string }
        staff_id: { type: string }
        branch_id: { type: string }
        type: { type: string }
        date: { type: string, format: date-time }
        status: { type: string }
        notes: { type: string }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    AppointmentCreate:
      type: object
      required: [patient_id, staff_id, branch_id, date]
      properties:
        patient_id: { type: string }
        staff_id: { type: string }
        branch_id: { type: string }
        type: { type: string }
        date: { type: string, format: date-time }
        status: { type: string }
        notes: { type: string }
    AppointmentUpdate:
      type: object
      properties:
        type: { type: string }
        date: { type: string, format: date-time }
        status: { type: string }
        notes: { type: string }
    AppointmentResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Appointment'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Appointment Table Migration
CREATE TABLE IF NOT EXISTS appointment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  type VARCHAR(50),
  date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX IF NOT EXISTS idx_appointment_patient ON appointment(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointment_branch ON appointment(branch_id);
```

---

## Prescription Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE prescription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  type VARCHAR(50),
  data JSONB,
  date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX idx_prescription_patient ON prescription(patient_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/prescriptions:
  get:
    summary: Get prescription list
    parameters:
      - in: query
        name: patientId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    prescriptions:
                      type: array
                      items:
                        $ref: '#/components/schemas/Prescription'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create prescription
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PrescriptionCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PrescriptionResponse'

/prescriptions/{id}:
  get:
    summary: Get prescription by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PrescriptionResponse'
  patch:
    summary: Update prescription
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PrescriptionUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PrescriptionResponse'
  delete:
    summary: Soft delete prescription
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Prescription:
      type: object
      properties:
        id: { type: string }
        patient_id: { type: string }
        staff_id: { type: string }
        type: { type: string }
        data: { type: object }
        date: { type: string, format: date-time }
        notes: { type: string }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    PrescriptionCreate:
      type: object
      required: [patient_id, staff_id, type, data, date]
      properties:
        patient_id: { type: string }
        staff_id: { type: string }
        type: { type: string }
        data: { type: object }
        date: { type: string, format: date-time }
        notes: { type: string }
    PrescriptionUpdate:
      type: object
      properties:
        type: { type: string }
        data: { type: object }
        date: { type: string, format: date-time }
        notes: { type: string }
    PrescriptionResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Prescription'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Prescription Table Migration
CREATE TABLE IF NOT EXISTS prescription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  type VARCHAR(50),
  data JSONB,
  date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX IF NOT EXISTS idx_prescription_patient ON prescription(patient_id);
```

---

## Transaction Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  description TEXT,
  amount NUMERIC(12,2) NOT NULL,
  type VARCHAR(20),
  method VARCHAR(20),
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX idx_transaction_patient ON transaction(patient_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/transactions:
  get:
    summary: Get transaction list
    parameters:
      - in: query
        name: patientId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    transactions:
                      type: array
                      items:
                        $ref: '#/components/schemas/Transaction'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create transaction
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/TransactionCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransactionResponse'

/transactions/{id}:
  get:
    summary: Get transaction by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransactionResponse'
  patch:
    summary: Update transaction
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/TransactionUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransactionResponse'
  delete:
    summary: Soft delete transaction
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Transaction:
      type: object
      properties:
        id: { type: string }
        patient_id: { type: string }
        staff_id: { type: string }
        description: { type: string }
        amount: { type: number, format: float }
        type: { type: string }
        method: { type: string }
        date: { type: string, format: date-time }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    TransactionCreate:
      type: object
      required: [patient_id, staff_id, amount, date]
      properties:
        patient_id: { type: string }
        staff_id: { type: string }
        description: { type: string }
        amount: { type: number, format: float }
        type: { type: string }
        method: { type: string }
        date: { type: string, format: date-time }
    TransactionUpdate:
      type: object
      properties:
        description: { type: string }
        amount: { type: number, format: float }
        type: { type: string }
        method: { type: string }
        date: { type: string, format: date-time }
    TransactionResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Transaction'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Transaction Table Migration
CREATE TABLE IF NOT EXISTS transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  description TEXT,
  amount NUMERIC(12,2) NOT NULL,
  type VARCHAR(20),
  method VARCHAR(20),
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patient(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX IF NOT EXISTS idx_transaction_patient ON transaction(patient_id);
```

---

## Branch Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE branch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  status VARCHAR(20) DEFAULT 'active',
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX idx_branch_org ON branch(org_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/branches:
  get:
    summary: Get branch list
    parameters:
      - in: query
        name: orgId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    branches:
                      type: array
                      items:
                        $ref: '#/components/schemas/Branch'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create branch
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/BranchCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BranchResponse'

/branches/{id}:
  get:
    summary: Get branch by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BranchResponse'
  patch:
    summary: Update branch
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/BranchUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BranchResponse'
  delete:
    summary: Soft delete branch
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Branch:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        name: { type: string }
        address: { type: string }
        status: { type: string }
        coordinates: { type: object }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    BranchCreate:
      type: object
      required: [org_id, name]
      properties:
        org_id: { type: string }
        name: { type: string }
        address: { type: string }
        status: { type: string }
        coordinates: { type: object }
    BranchUpdate:
      type: object
      properties:
        name: { type: string }
        address: { type: string }
        status: { type: string }
        coordinates: { type: object }
    BranchResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Branch'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Branch Table Migration
CREATE TABLE IF NOT EXISTS branch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  status VARCHAR(20) DEFAULT 'active',
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX IF NOT EXISTS idx_branch_org ON branch(org_id);
```

---

## Staff Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(30) NOT NULL,
  password_hash TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX idx_staff_org ON staff(org_id);
CREATE INDEX idx_staff_branch ON staff(branch_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/staff:
  get:
    summary: Get staff list
    parameters:
      - in: query
        name: orgId
        schema: { type: string }
      - in: query
        name: branchId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    staff:
                      type: array
                      items:
                        $ref: '#/components/schemas/Staff'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create staff
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/StaffCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StaffResponse'

/staff/{id}:
  get:
    summary: Get staff by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StaffResponse'
  patch:
    summary: Update staff
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/StaffUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/StaffResponse'
  delete:
    summary: Soft delete staff
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    Staff:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        branch_id: { type: string }
        name: { type: string }
        email: { type: string }
        role: { type: string }
        avatar: { type: string }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    StaffCreate:
      type: object
      required: [org_id, branch_id, name, email, role, password]
      properties:
        org_id: { type: string }
        branch_id: { type: string }
        name: { type: string }
        email: { type: string }
        role: { type: string }
        password: { type: string }
        avatar: { type: string }
    StaffUpdate:
      type: object
      properties:
        name: { type: string }
        email: { type: string }
        role: { type: string }
        password: { type: string }
        avatar: { type: string }
    StaffResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Staff'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Staff Table Migration
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(30) NOT NULL,
  password_hash TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id)
);
CREATE INDEX IF NOT EXISTS idx_staff_org ON staff(org_id);
CREATE INDEX IF NOT EXISTS idx_staff_branch ON staff(branch_id);
```

---

## Inventory Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE inventory_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  supplier_id UUID,
  name VARCHAR(100) NOT NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  category VARCHAR(50),
  quantity INT NOT NULL DEFAULT 0,
  reorder_point INT NOT NULL DEFAULT 0,
  price NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'in_stock',
  is_custom BOOLEAN DEFAULT false,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id),
  CONSTRAINT fk_supplier FOREIGN KEY(supplier_id) REFERENCES supplier(id)
);
CREATE INDEX idx_inventory_branch ON inventory_item(branch_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/inventory:
  get:
    summary: Get inventory list
    parameters:
      - in: query
        name: branchId
        schema: { type: string }
      - in: query
        name: status
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    inventory:
                      type: array
                      items:
                        $ref: '#/components/schemas/InventoryItem'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create inventory item
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/InventoryItemCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InventoryItemResponse'

/inventory/{id}:
  get:
    summary: Get inventory item by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InventoryItemResponse'
  patch:
    summary: Update inventory item
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/InventoryItemUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InventoryItemResponse'
  delete:
    summary: Soft delete inventory item
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    InventoryItem:
      type: object
      properties:
        id: { type: string }
        branch_id: { type: string }
        supplier_id: { type: string }
        name: { type: string }
        sku: { type: string }
        category: { type: string }
        quantity: { type: integer }
        reorder_point: { type: integer }
        price: { type: number, format: float }
        status: { type: string }
        is_custom: { type: boolean }
        last_updated: { type: string, format: date-time }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    InventoryItemCreate:
      type: object
      required: [branch_id, name, sku, price]
      properties:
        branch_id: { type: string }
        supplier_id: { type: string }
        name: { type: string }
        sku: { type: string }
        category: { type: string }
        quantity: { type: integer }
        reorder_point: { type: integer }
        price: { type: number, format: float }
        status: { type: string }
        is_custom: { type: boolean }
    InventoryItemUpdate:
      type: object
      properties:
        supplier_id: { type: string }
        name: { type: string }
        sku: { type: string }
        category: { type: string }
        quantity: { type: integer }
        reorder_point: { type: integer }
        price: { type: number, format: float }
        status: { type: string }
        is_custom: { type: boolean }
    InventoryItemResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/InventoryItem'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Inventory Item Table Migration
CREATE TABLE IF NOT EXISTS inventory_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  supplier_id UUID,
  name VARCHAR(100) NOT NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  category VARCHAR(50),
  quantity INT NOT NULL DEFAULT 0,
  reorder_point INT NOT NULL DEFAULT 0,
  price NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'in_stock',
  is_custom BOOLEAN DEFAULT false,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_branch FOREIGN KEY(branch_id) REFERENCES branch(id),
  CONSTRAINT fk_supplier FOREIGN KEY(supplier_id) REFERENCES supplier(id)
);
CREATE INDEX IF NOT EXISTS idx_inventory_branch ON inventory_item(branch_id);
```

---

## Loan Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE loan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  lender VARCHAR(100) NOT NULL,
  loan_type VARCHAR(50),
  original_amount NUMERIC(12,2) NOT NULL,
  remaining_balance NUMERIC(12,2) NOT NULL,
  interest_rate NUMERIC(5,2),
  term INT,
  start_date TIMESTAMPTZ NOT NULL,
  next_payment_date TIMESTAMPTZ,
  monthly_payment NUMERIC(12,2),
  status VARCHAR(20) DEFAULT 'current',
  collateral TEXT,
  purpose TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX idx_loan_org ON loan(org_id);

CREATE TABLE loan_payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  principal NUMERIC(12,2),
  interest NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_loan FOREIGN KEY(loan_id) REFERENCES loan(id)
);
CREATE INDEX idx_loan_payment_loan ON loan_payment(loan_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/loans:
  get:
    summary: Get loan list
    parameters:
      - in: query
        name: orgId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    loans:
                      type: array
                      items:
                        $ref: '#/components/schemas/Loan'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create loan
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/LoanCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoanResponse'

/loans/{id}:
  get:
    summary: Get loan by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoanResponse'
  patch:
    summary: Update loan
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/LoanUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoanResponse'
  delete:
    summary: Soft delete loan
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

/loans/{id}/payments:
  get:
    summary: Get loan payments
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    payments:
                      type: array
                      items:
                        $ref: '#/components/schemas/LoanPayment'
                    total: { type: integer }
                error: { type: string, nullable: true }

components:
  schemas:
    Loan:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        lender: { type: string }
        loan_type: { type: string }
        original_amount: { type: number, format: float }
        remaining_balance: { type: number, format: float }
        interest_rate: { type: number, format: float }
        term: { type: integer }
        start_date: { type: string, format: date-time }
        next_payment_date: { type: string, format: date-time }
        monthly_payment: { type: number, format: float }
        status: { type: string }
        collateral: { type: string }
        purpose: { type: string }
        notes: { type: string }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    LoanCreate:
      type: object
      required: [org_id, lender, original_amount, start_date]
      properties:
        org_id: { type: string }
        lender: { type: string }
        loan_type: { type: string }
        original_amount: { type: number, format: float }
        remaining_balance: { type: number, format: float }
        interest_rate: { type: number, format: float }
        term: { type: integer }
        start_date: { type: string, format: date-time }
        next_payment_date: { type: string, format: date-time }
        monthly_payment: { type: number, format: float }
        status: { type: string }
        collateral: { type: string }
        purpose: { type: string }
        notes: { type: string }
    LoanUpdate:
      type: object
      properties:
        lender: { type: string }
        loan_type: { type: string }
        original_amount: { type: number, format: float }
        remaining_balance: { type: number, format: float }
        interest_rate: { type: number, format: float }
        term: { type: integer }
        start_date: { type: string, format: date-time }
        next_payment_date: { type: string, format: date-time }
        monthly_payment: { type: number, format: float }
        status: { type: string }
        collateral: { type: string }
        purpose: { type: string }
        notes: { type: string }
    LoanResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/Loan'
        error: { type: string, nullable: true }
    LoanPayment:
      type: object
      properties:
        id: { type: string }
        loan_id: { type: string }
        date: { type: string, format: date-time }
        amount: { type: number, format: float }
        principal: { type: number, format: float }
        interest: { type: number, format: float }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Loan Table Migration
CREATE TABLE IF NOT EXISTS loan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  lender VARCHAR(100) NOT NULL,
  loan_type VARCHAR(50),
  original_amount NUMERIC(12,2) NOT NULL,
  remaining_balance NUMERIC(12,2) NOT NULL,
  interest_rate NUMERIC(5,2),
  term INT,
  start_date TIMESTAMPTZ NOT NULL,
  next_payment_date TIMESTAMPTZ,
  monthly_payment NUMERIC(12,2),
  status VARCHAR(20) DEFAULT 'current',
  collateral TEXT,
  purpose TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX IF NOT EXISTS idx_loan_org ON loan(org_id);

CREATE TABLE IF NOT EXISTS loan_payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  principal NUMERIC(12,2),
  interest NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_loan FOREIGN KEY(loan_id) REFERENCES loan(id)
);
CREATE INDEX IF NOT EXISTS idx_loan_payment_loan ON loan_payment(loan_id);
```

---

## Community Feature (Post)

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE community_post (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  tags JSONB,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX idx_community_post_org ON community_post(org_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/community/posts:
  get:
    summary: Get community posts
    parameters:
      - in: query
        name: orgId
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    posts:
                      type: array
                      items:
                        $ref: '#/components/schemas/CommunityPost'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create community post
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CommunityPostCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommunityPostResponse'

/community/posts/{id}:
  get:
    summary: Get community post by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommunityPostResponse'
  patch:
    summary: Update community post
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CommunityPostUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommunityPostResponse'
  delete:
    summary: Soft delete community post
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    CommunityPost:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        staff_id: { type: string }
        title: { type: string }
        content: { type: string }
        image: { type: string }
        tags: { type: array, items: { type: string } }
        likes: { type: integer }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    CommunityPostCreate:
      type: object
      required: [org_id, staff_id, title, content]
      properties:
        org_id: { type: string }
        staff_id: { type: string }
        title: { type: string }
        content: { type: string }
        image: { type: string }
        tags: { type: array, items: { type: string } }
    CommunityPostUpdate:
      type: object
      properties:
        title: { type: string }
        content: { type: string }
        image: { type: string }
        tags: { type: array, items: { type: string } }
    CommunityPostResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/CommunityPost'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Community Post Table Migration
CREATE TABLE IF NOT EXISTS community_post (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  staff_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  tags JSONB,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id),
  CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);
CREATE INDEX IF NOT EXISTS idx_community_post_org ON community_post(org_id);
```

---

## Financial Feature (Report)

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE financial_report (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  period TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX idx_financial_report_org ON financial_report(org_id);
```

### 2. OpenAPI Spec (YAML)
```yaml
/financial/reports:
  get:
    summary: Get financial reports
    parameters:
      - in: query
        name: orgId
        schema: { type: string }
      - in: query
        name: type
        schema: { type: string }
      - in: query
        name: period
        schema: { type: string, format: date-time }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    reports:
                      type: array
                      items:
                        $ref: '#/components/schemas/FinancialReport'
                    total: { type: integer }
                error: { type: string, nullable: true }
  post:
    summary: Create financial report
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/FinancialReportCreate'
    responses:
      '201':
        description: Created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FinancialReportResponse'

/financial/reports/{id}:
  get:
    summary: Get financial report by ID
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '200':
        description: OK
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FinancialReportResponse'
  patch:
    summary: Update financial report
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/FinancialReportUpdate'
    responses:
      '200':
        description: Updated
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FinancialReportResponse'
  delete:
    summary: Soft delete financial report
    parameters:
      - in: path
        name: id
        required: true
        schema: { type: string }
    responses:
      '204':
        description: No Content

components:
  schemas:
    FinancialReport:
      type: object
      properties:
        id: { type: string }
        org_id: { type: string }
        type: { type: string }
        data: { type: object }
        period: { type: string, format: date-time }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
        deleted_at: { type: string, format: date-time, nullable: true }
    FinancialReportCreate:
      type: object
      required: [org_id, type, data, period]
      properties:
        org_id: { type: string }
        type: { type: string }
        data: { type: object }
        period: { type: string, format: date-time }
    FinancialReportUpdate:
      type: object
      properties:
        type: { type: string }
        data: { type: object }
        period: { type: string, format: date-time }
    FinancialReportResponse:
      type: object
      properties:
        success: { type: boolean }
        data:
          $ref: '#/components/schemas/FinancialReport'
        error: { type: string, nullable: true }
```

### 3. Migration Script (SQL)
```sql
-- Financial Report Table Migration
CREATE TABLE IF NOT EXISTS financial_report (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  period TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
CREATE INDEX IF NOT EXISTS idx_financial_report_org ON financial_report(org_id);
```

---

## Auth/Session/RBAC Feature

### 1. Table Schema (PostgreSQL)
```sql
CREATE TABLE role (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE user_role (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  org_id UUID NOT NULL,
  PRIMARY KEY (user_id, role_id, org_id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES staff(id),
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id),
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);

CREATE TABLE session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  refresh_token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  revoked BOOLEAN DEFAULT false,
  revoked_at TIMESTAMPTZ,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES staff(id)
);
```

### 2. OpenAPI Spec (YAML)
```yaml
/auth/login:
  post:
    summary: Login
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [email, password]
            properties:
              email: { type: string }
              password: { type: string }
    responses:
      '200':
        description: Login success
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    access_token: { type: string }
                    refresh_token: { type: string }
                    user: { $ref: '#/components/schemas/Staff' }
                error: { type: string, nullable: true }
/auth/refresh:
  post:
    summary: Refresh token
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [refresh_token]
            properties:
              refresh_token: { type: string }
    responses:
      '200':
        description: Token refreshed
        content:
          application/json:
            schema:
              type: object
              properties:
                success: { type: boolean }
                data:
                  type: object
                  properties:
                    access_token: { type: string }
                    refresh_token: { type: string }
                error: { type: string, nullable: true }
/auth/logout:
  post:
    summary: Logout
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [refresh_token]
            properties:
              refresh_token: { type: string }
    responses:
      '204':
        description: Logged out
```

### 3. Migration Script (SQL)
```sql
-- Role Table
CREATE TABLE IF NOT EXISTS role (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);
-- User Role Table
CREATE TABLE IF NOT EXISTS user_role (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  org_id UUID NOT NULL,
  PRIMARY KEY (user_id, role_id, org_id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES staff(id),
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id),
  CONSTRAINT fk_org FOREIGN KEY(org_id) REFERENCES organization(id)
);
-- Session Table
CREATE TABLE IF NOT EXISTS session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  refresh_token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  revoked BOOLEAN DEFAULT false,
  revoked_at TIMESTAMPTZ,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES staff(id)
);
```

---

# หมายเหตุ
- Feature อื่น ๆ (inventory, loan, community, financial, auth/session/rbac) จะเพิ่มต่อให้ได้ทันทีเมื่อแจ้ง
- ถ้าต้องการตัวอย่าง schema, OpenAPI, หรือ migration script สำหรับ feature อื่น แจ้งได้เลย! 


---

## Org-Level Data Isolation (Multi-Tenant Security)

**ทุก endpoint ที่เกี่ยวข้องกับข้อมูลต้อง enforce org_id จาก JWT/session เสมอ**

### ตัวอย่าง Express Middleware (TypeScript)
```ts
// middlewares/orgContext.ts
import { Request, Response, NextFunction } from 'express';

export function orgContext(req: Request, res: Response, next: NextFunction) {
  const orgId = req.user?.org_id; // สมมติ JWT decode แล้ว inject user
  if (!orgId) return res.status(403).json({ success: false, error: { code: 'ORG_CONTEXT_REQUIRED', message: 'No org context' } });
  req.org_id = orgId;
  next();
}
```
**ใน service/query ทุกครั้งต้อง filter ด้วย org_id**
```ts
// patient.service.ts
const patients = await db('patient').where({ org_id: req.org_id, ...otherFilters });
```

---

## 2. Expand/Embed Resource

**รองรับ query param `?embed=patient,staff,branch` ในทุก endpoint ที่เกี่ยวข้อง**

### ตัวอย่าง Spec
```yaml
GET /appointments?embed=patient,staff,branch
```
**ตัวอย่าง Response**
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "...",
        "patient": { "id": "...", "name": "..." },
        "staff": { "id": "...", "name": "..." },
        "branch": { "id": "...", "name": "..." },
        ...
      }
    ]
  }
}
```
**แนวทางเขียน service**
- เขียน generic join/expand logic
- หรือใช้ ORM relation + select/expand

---

## 3. Error Response Spec กลาง

**กำหนด error format กลาง**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Name is required",
    "field": "name"
  }
}
```
- ทุก error ต้องมี code, message, field (ถ้ามี)
- สร้าง error code registry กลาง (enum/constant)
- ทุก endpoint ต้องใช้ format นี้

---

## 4. Logging / Audit / Event Hook

**เพิ่ม audit_log table**
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID,
  action VARCHAR(50) NOT NULL,
  resource VARCHAR(50) NOT NULL,
  resource_id UUID,
  before JSONB,
  after JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_audit_log_org ON audit_log(org_id);
```
**ทุก action สำคัญ (CRUD, login, permission change) ต้อง log**
- เขียน helper function logAudit(action, resource, before, after, req)

---

## 5. Rate Limit / Monitoring / Healthcheck / Liveness

**เพิ่มในไฟล์**
- ติดตั้ง express-rate-limit, prom-client
- เพิ่ม /health, /metrics endpoint

```ts
// server.ts
import rateLimit from 'express-rate-limit';
import promClient from 'prom-client';

app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 })); // 100 req/min

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

---

## 6. RBAC Enforcement

**ทุก endpoint ต้อง check scope/role**
- เขียน middleware rbacGuard(requiredScope: string[])
- ทุก route ต้องระบุ scope ที่ต้องการ

---

## 7. ตัวอย่าง Test/Monitoring/Alert

- มี test case สำหรับ data isolation, error, audit, rate limit
- Monitoring ด้วย Sentry, Datadog, Prometheus, Grafana
- Alert ถ้า error rate สูง, latency สูง, health check fail

---

## 8. ตัวอย่างไฟล์ OpenAPI Error Spec

```yaml
components:
  responses:
    ErrorResponse:
      description: Error
      content:
        application/json:
          schema:
            type: object
            properties:
              success: { type: boolean, example: false }
              error:
                type: object
                properties:
                  code: { type: string }
                  message: { type: string }
                  field: { type: string }
```

---

**สรุป:**  
- เพิ่ม section เหล่านี้ใน PRODUCTION_BACKEND_FULL_SPEC.md  
- ทุกจุดที่ “ตบหัว dev” ต้อง enforce จริงใน code, test, doc, monitoring  
- ถ้าต้องการตัวอย่างโค้ด middleware, audit, embed, error, monitoring, test เพิ่มเติม แจ้งได้เลย!