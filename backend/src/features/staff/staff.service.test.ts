import * as staffService from './staff.service';
import db from '../../config/db';
jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Staff Service', () => {
  const org_id = 'org-uuid';
  const user_id = 'user-uuid';
  const staffData = { org_id, branch_id: 'branch-uuid', name: 'Test Staff', email: 'test@example.com', role: 'admin', password_hash: 'hash' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create staff and log audit', async () => {
    (db as any).mockReturnValueOnce([{ ...staffData, id: 'id', created_at: '', updated_at: '' }]);
    const staff = await staffService.createStaff(org_id, staffData, user_id);
    expect(staff.name).toBe('Test Staff');
  });

  // ...more tests for get, update, delete
}); 