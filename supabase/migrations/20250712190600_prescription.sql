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