import { Request, Response } from 'express';
import * as branchService from './branch.service';
import { AppError } from '../../utils/errors';

function requireUser(req: Request): string {
  if (!req.user) {
    throw new AppError('Not authenticated', 401);
  }
  return req.user.id;
}

function requireOrg(req: Request): string {
  if (!req.org_id) {
    throw new AppError('Organization ID is required', 400);
  }
  return req.org_id;
}

export async function getBranches(req: Request, res: Response) {
  const org_id = requireOrg(req);
  const branches = await branchService.getBranches(org_id, req.query);
  return res.json({ success: true, data: branches });
}

export async function getBranchById(req: Request, res: Response) {
  const org_id = requireOrg(req);
  const { id } = req.params;
  const branch = await branchService.getBranchById(org_id, id);
  
  if (!branch) {
    return res.status(404).json({
      success: false,
      error: { code: 'BRANCH_NOT_FOUND', message: 'Branch not found' }
    });
  }
  
  return res.json({ success: true, data: branch });
}

export async function createBranch(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const branch = await branchService.createBranch(org_id, req.body, user_id);
  return res.status(201).json({ success: true, data: branch });
}

export async function updateBranch(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const { id } = req.params;
  
  const branch = await branchService.updateBranch(org_id, id, req.body, user_id);
  
  if (!branch) {
    return res.status(404).json({
      success: false,
      error: { code: 'BRANCH_NOT_FOUND', message: 'Branch not found' }
    });
  }
  
  return res.json({ success: true, data: branch });
}

export async function deleteBranch(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const { id } = req.params;
  
  const success = await branchService.deleteBranch(org_id, id, user_id);
  
  if (!success) {
    return res.status(404).json({
      success: false,
      error: { code: 'BRANCH_NOT_FOUND', message: 'Branch not found' }
    });
  }
  
  return res.json({ success: true });
}