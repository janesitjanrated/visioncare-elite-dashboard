import * as patientService from './patient.service';
import db from '../../config/db';
import { CreatePatientDTO } from './patient.model';

jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Patient Service', () => {
  const org_id = 'org-uuid';
  const user_id = 'user-uuid';
  const patientData: CreatePatientDTO = { 
    org_id, 
    branch_id: 'branch-uuid', 
    first_name: 'John',
    last_name: 'Doe',
    status: 'active',
    email: 'john@example.com',
    phone: '+1234567890',
    date_of_birth: '1990-01-01',
    gender: 'male',
    blood_type: 'O+',
    allergies: ['peanuts'],
    medical_conditions: ['none'],
    insurance_provider: 'ABC Insurance',
    insurance_id: 'INS123',
    emergency_contact_name: 'Jane Doe',
    emergency_contact_phone: '+0987654321'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{
        ...patientData,
        id: 'patient-uuid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }])
    });
  });

  it('should create patient and log audit', async () => {
    const patient = await patientService.createPatient(patientData, user_id);
    expect(patient).toMatchObject({
      id: expect.any(String),
      org_id,
      branch_id: 'branch-uuid',
      first_name: 'John',
      last_name: 'Doe',
      status: 'active'
    });
  });

  // ...more tests for get, update, delete
});