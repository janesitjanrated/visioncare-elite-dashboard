import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import db from '../config/db';

(async () => {
  try {
    const res = await db.raw('SELECT version();');
    console.log('PostgreSQL connected!');
    console.log('DB Version:', res.rows[0].version);
    await db.destroy(); // Clean up connection
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
})(); 