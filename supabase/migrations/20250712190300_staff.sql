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