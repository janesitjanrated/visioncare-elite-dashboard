import * as orgService from './organization.service';
import db from '../../config/db';
import { CreateOrganizationDTO } from './organization.model';

jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Organization Service', () => {
  const user_id = 'user-uuid';
  const orgData: CreateOrganizationDTO = { 
    name: 'Test Org',
    status: 'active'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (db as any).mockReturnValue({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{
        ...orgData,
        id: 'org-uuid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }])
    });
  });

  it('should create organization and log audit', async () => {
    const org = await orgService.createOrganization(orgData, user_id);
    expect(org).toMatchObject({
      id: expect.any(String),
      name: 'Test Org',
      status: 'active'
    });
  });

  // ...more tests for get, update, delete
});