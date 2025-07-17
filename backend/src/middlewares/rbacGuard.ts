import { Request, Response, NextFunction } from 'express';

export const rbacGuard = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user from request (assuming it's set by authentication middleware)
      const user = (req as any).user;
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if user has required permissions
      // This is a simple implementation. You might want to enhance it based on your needs
      const hasPermission = requiredPermissions.every(permission => 
        user.permissions?.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ 
          error: 'Forbidden',
          message: 'You do not have the required permissions'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
