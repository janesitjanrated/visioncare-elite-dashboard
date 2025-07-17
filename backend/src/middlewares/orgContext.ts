import { Request, Response, NextFunction } from 'express';

class OrganizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrganizationError';
    Object.setPrototypeOf(this, OrganizationError.prototype);
  }
}

export const orgContext = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgId = req.headers['x-organization-id'];

    if (!orgId || (Array.isArray(orgId) && orgId.length === 0)) {
      throw new OrganizationError('Organization ID is required');
    }

    // Convert to string if it's an array (because headers can be string[])
    const organizationId = Array.isArray(orgId) ? orgId[0] : orgId;

    // We've extended the Request type in express.d.ts, so this is type-safe
    (req as any).org_id = organizationId;
    next();
  } catch (error) {
    if (error instanceof OrganizationError) {
      return res.status(400).json({
        success: false,
        error: { code: 'NO_ORG', message: error.message }
      });
    }
    next(error);
  }
};
