import { Pool } from 'pg';

export const pool = new Pool({
  user: 'medlab',
  host: 'localhost',
  database: 'visualDB',
  password: '592954',
  port: 5432,
  ssl: false,
  connectionTimeoutMillis: 10000
});

// Test connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Close pool on application shutdown
process.on('SIGINT', () => {
  pool.end();
  process.exit(0);
});

process.on('SIGTERM', () => {
  pool.end();
  process.exit(0);
}); 