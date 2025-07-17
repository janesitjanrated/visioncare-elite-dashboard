import { Request, Response } from 'express';
import * as appointmentService from './appointment.service';
import { AppError } from '../../utils/errors';

function requireUser(req: Request): string {
  if (!(req as any).user) {
    throw new AppError('Not authenticated', 401);
  }
  return (req as any).user.id;
}

function requireOrg(req: Request): string {
  if (!(req as any).org_id) {
    throw new AppError('Organization ID is required', 400);
  }
  return (req as any).org_id;
}

export async function getAppointments(req: Request, res: Response) {
  const org_id = requireOrg(req);
  const appointments = await appointmentService.getAppointments(org_id, req.query);
  return res.json({ success: true, data: appointments });
}

export async function getAppointmentById(req: Request, res: Response) {
  const org_id = requireOrg(req);
  const { id } = req.params;
  const appointment = await appointmentService.getAppointmentById(org_id, id);
  
  if (!appointment) {
    return res.status(404).json({
      success: false,
      error: { code: 'APPOINTMENT_NOT_FOUND', message: 'Appointment not found' }
    });
  }
  
  return res.json({ success: true, data: appointment });
}

export async function createAppointment(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const appointment = await appointmentService.createAppointment(org_id, req.body, user_id);
  return res.status(201).json({ success: true, data: appointment });
}

export async function updateAppointment(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const { id } = req.params;
  
  const appointment = await appointmentService.updateAppointment(org_id, id, req.body, user_id);
  
  if (!appointment) {
    return res.status(404).json({
      success: false,
      error: { code: 'APPOINTMENT_NOT_FOUND', message: 'Appointment not found' }
    });
  }
  
  return res.json({ success: true, data: appointment });
}

export async function deleteAppointment(req: Request, res: Response) {
  const user_id = requireUser(req);
  const org_id = requireOrg(req);
  const { id } = req.params;
  
  const success = await appointmentService.deleteAppointment(org_id, id, user_id);
  
  if (!success) {
    return res.status(404).json({
      success: false,
      error: { code: 'APPOINTMENT_NOT_FOUND', message: 'Appointment not found' }
    });
  }
  
  return res.json({ success: true });
}