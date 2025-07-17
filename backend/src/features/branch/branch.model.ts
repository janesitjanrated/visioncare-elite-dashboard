export interface Branch {
  id: string;
  org_id: string;
  name: string;
  address?: string;
  status?: string;
  coordinates?: object;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
} 