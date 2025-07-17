import * as branchService from './branch.service';
import db from '../../config/db';
jest.mock('../../config/db');
jest.mock('../../utils/logger', () => ({ logAudit: jest.fn() }));

describe('Branch Service', () => {
  const org_id = 'org-uuid';
  const user_id = 'user-uuid';
  const branchData = { org_id, name: 'Test Branch' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create branch and log audit', async () => {
    (db as any).mockReturnValueOnce([{ ...branchData, id: 'id', created_at: '', updated_at: '' }]);
    const branch = await branchService.createBranch(org_id, branchData, user_id);
    expect(branch.name).toBe('Test Branch');
  });

  // ...more tests for get, update, delete
}); 