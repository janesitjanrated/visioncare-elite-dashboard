import db from '../../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LoginInput } from './auth.validation';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH as string);
const JWT_ISSUER = process.env.JWT_ISSUER || 'medlab';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'medlab-users';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export async function authenticateUser({ username, password }: LoginInput) {
  const user = await db('users').where({ username }).first();
  if (!user) throw new Error('Invalid username or password');
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid username or password');
  // session_id, org_id, scope
  const session_id = uuidv4();
  const org_id = user.org_id || null;
  const scope = user.scope || 'user';
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id.toString(),
    session_id,
    org_id,
    scope,
    iat: now,
    nbf: now,
    exp: now + 60 * 60, // 1h
    iss: JWT_ISSUER,
    aud: JWT_AUDIENCE,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return { token, user: { id: user.id, username: user.username, org_id, scope } };
}
