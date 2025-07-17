export interface Staff {
  id: string;
  org_id: string;
  branch_id: string;
  name: string;
  email: string;
  role: string;
  password_hash: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
} 