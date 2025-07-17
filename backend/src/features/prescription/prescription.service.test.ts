import * as prescriptionService from './prescription.service';
import db from '../../config/db';
import { CreatePrescriptionDTO } from './prescription.model';

jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Prescription Service', () => {
  const user_id = 'user-uuid';
  const org_id = 'org-uuid';
  const branch_id = 'branch-uuid';
  
  const prescriptionData: CreatePrescriptionDTO = {
    org_id,
    branch_id,
    patient_id: 'p1',
    staff_id: 's1',
    medication: 'Paracetamol',
    dosage: '500mg',
    frequency: 'Every 6 hours',
    duration: '5 days',
    status: 'active',
    instructions: 'Take after meals',
    notes: 'Patient reported headache',
    date: new Date().toISOString()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{
        ...prescriptionData,
        id: 'prescription-uuid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }])
    });
  });

  it('should create prescription and log audit', async () => {
    const prescription = await prescriptionService.createPrescription(prescriptionData, user_id);
    expect(prescription).toMatchObject({
      id: expect.any(String),
      org_id,
      branch_id,
      patient_id: 'p1',
      staff_id: 's1',
      medication: 'Paracetamol',
      status: 'active'
    });
  });

  // ...more tests for get, update, delete
});