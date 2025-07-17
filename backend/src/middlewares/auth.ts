import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      permissions?: string[];
    };
    org_id?: string;
  }
}

interface JWTPayload extends JwtPayload {
  user_id: string;
  permissions?: string[];
  org_id?: string;
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      const decoded = jwt.verify(token, secret) as JWTPayload;
      if (!decoded.user_id) {
        throw new AuthenticationError('Invalid token payload');
      }

      req.user = {
        id: decoded.user_id,
        permissions: decoded.permissions
      };

      if (decoded.org_id) {
        req.org_id = decoded.org_id;
      }

      next();
    } catch (jwtError) {
      throw new AuthenticationError('Invalid token');
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: error.message
        }
      });
    } else {
      console.error('Authentication error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Internal server error'
        }
      });
    }
  }
};
