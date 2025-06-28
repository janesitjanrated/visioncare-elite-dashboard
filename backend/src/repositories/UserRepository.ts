
import { Pool } from 'pg';
import { User, UserDTO } from '../models/User';

export class UserRepository {
  constructor(private pool: Pool) {}

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await this.pool.query(query, [email, password]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await this.pool.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *';
    const result = await this.pool.query(query, [userData.email, userData.password, userData.name]);
    return result.rows[0];
  }
}
