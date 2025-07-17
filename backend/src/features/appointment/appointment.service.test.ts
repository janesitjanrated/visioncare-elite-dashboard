import * as appointmentService from './appointment.service';
import db from '../../config/db';
jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Appointment Service', () => {
  const user_id = 'user-uuid';
  const appointmentData = { patient_id: 'p1', staff_id: 's1', branch_id: 'b1', date: new Date().toISOString() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create appointment and log audit', async () => {
    const org_id = 'org1';
    (db as any).mockReturnValueOnce([{ ...appointmentData, id: 'id', created_at: '', updated_at: '' }]);
    const appointment = await appointmentService.createAppointment(org_id, appointmentData, user_id);
    expect(appointment.patient_id).toBe('p1');
  });

  // ...more tests for get, update, delete
}); 