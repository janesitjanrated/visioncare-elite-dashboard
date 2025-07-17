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