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