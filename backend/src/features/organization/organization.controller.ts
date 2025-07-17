import { Request, Response } from 'express';
import * as orgService from './organization.service';
import { organizationCreateSchema, organizationUpdateSchema } from './organization.validation';

export async function getOrganizations(req: Request, res: Response) {
  const orgs = await orgService.getOrganizations(req.query);
  res.json({ success: true, data: { organizations: orgs } });
}

export async function getOrganizationById(req: Request, res: Response) {
  const { id } = req.params;
  const org = await orgService.getOrganizationById(id);
  if (!org) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Organization not found' } });
  res.json({ success: true, data: org });
}

export async function createOrganization(req: Request, res: Response) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User must be authenticated' } });
  }
  
  const { error } = organizationCreateSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.message, field: error.details[0]?.path[0] } });
  
  const org = await orgService.createOrganization(req.body, user_id);
  res.status(201).json({ success: true, data: org });
}

export async function updateOrganization(req: Request, res: Response) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User must be authenticated' } });
  }

  const { id } = req.params;
  const { error } = organizationUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.message, field: error.details[0]?.path[0] } });
  
  const org = await orgService.updateOrganization(id, req.body, user_id);
  if (!org) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Organization not found' } });
  res.json({ success: true, data: org });
}

export async function deleteOrganization(req: Request, res: Response) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User must be authenticated' } });
  }

  const { id } = req.params;
  const ok = await orgService.deleteOrganization(id, user_id);
  if (!ok) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Organization not found' } });
  res.status(204).send();
}