import { Request, Response } from 'express';
import { loginSchema } from './auth.validation';
import { authenticateUser } from './auth.service';

export async function loginController(req: Request, res: Response) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const result = await authenticateUser(parsed.data);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.message || 'Authentication failed' });
  }
}
