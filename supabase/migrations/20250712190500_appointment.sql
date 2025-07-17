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