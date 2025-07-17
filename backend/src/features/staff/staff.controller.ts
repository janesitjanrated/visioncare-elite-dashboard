import { Request, Response } from 'express';
import * as staffService from './staff.service';
import { staffCreateSchema, staffUpdateSchema } from './staff.validation';

export async function getStaff(req: Request, res: Response) {
  if (!req.org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }
  
  const org_id = req.org_id;
  const filters = req.query;
  const staff = await staffService.getStaff(org_id, filters);
  res.json({ success: true, data: { staff } });
}

export async function getStaffById(req: Request, res: Response) {
  if (!req.org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  const org_id = req.org_id;
  const { id } = req.params;
  const staff = await staffService.getStaffById(org_id, id);
  if (!staff) {
    return res.status(404).json({ 
      success: false, 
      error: { 
        code: 'NOT_FOUND', 
        message: 'Staff not found' 
      } 
    });
  }
  
  res.json({ success: true, data: staff });
}

export async function createStaff(req: Request, res: Response) {
  if (!req.org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!req.user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const org_id = req.org_id;
  const user_id = req.user.id;
  
  const { error } = staffCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false, 
      error: { 
        code: 'VALIDATION_ERROR', 
        message: error.message, 
        field: error.details[0]?.path[0] 
      } 
    });
  }

  const staff = await staffService.createStaff(org_id, req.body, user_id);
  res.status(201).json({ success: true, data: staff });
}

export async function updateStaff(req: Request, res: Response) {
  if (!req.org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!req.user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const org_id = req.org_id;
  const user_id = req.user.id;
  const { id } = req.params;
  
  const { error } = staffUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false, 
      error: { 
        code: 'VALIDATION_ERROR', 
        message: error.message, 
        field: error.details[0]?.path[0] 
      } 
    });
  }

  const staff = await staffService.updateStaff(org_id, id, req.body, user_id);
  if (!staff) {
    return res.status(404).json({ 
      success: false, 
      error: { 
        code: 'NOT_FOUND', 
        message: 'Staff not found' 
      } 
    });
  }

  res.json({ success: true, data: staff });
}

export async function deleteStaff(req: Request, res: Response) {
  if (!req.org_id) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  }

  if (!req.user?.id) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
  }

  const org_id = req.org_id;
  const user_id = req.user.id;
  const { id } = req.params;

  const ok = await staffService.deleteStaff(org_id, id, user_id);
  if (!ok) {
    return res.status(404).json({ 
      success: false, 
      error: { 
        code: 'NOT_FOUND', 
        message: 'Staff not found' 
      } 
    });
  }

  res.status(204).send();
} 