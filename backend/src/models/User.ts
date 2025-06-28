
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserDTO {
  id: number;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserDTO;
  message?: string;
}
