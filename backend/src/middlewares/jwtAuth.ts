import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH as string);
const JWT_ISSUER = process.env.JWT_ISSUER || 'medlab';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'medlab-users';

export const jwtAuth = (requiredScopes: string[] = []) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: { code: 'NO_TOKEN', message: 'Authorization token is required' }
      });
    }
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as JwtPayload;
    // ตรวจ scope
    if (requiredScopes.length > 0) {
      const userScopes = (decoded.scope || '').split(',');
      const hasScope = requiredScopes.some(scope => userScopes.includes(scope));
      if (!hasScope) {
        console.warn(`[JWT] Forbidden: scope required ${requiredScopes}, user scopes: ${userScopes}`);
        return res.status(403).json({ error: 'Insufficient scope' });
      }
    }
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    // log fail
    console.error('[JWT] Auth failed:', error.message);
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: error.message || 'Invalid or expired token' }
    });
  }
};
