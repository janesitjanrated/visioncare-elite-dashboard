export const logger = {
  info: (...args: unknown[]) => console.log('[INFO]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};

export async function logAudit(
  action: 'create' | 'update' | 'delete',
  entityType: string,
  before: any,
  after: any,
  context: { org_id: string; user_id: string }
): Promise<void> {
  logger.info({
    type: 'audit',
    action,
    entityType,
    before,
    after,
    context,
    timestamp: new Date().toISOString()
  });
}

export default logger;
