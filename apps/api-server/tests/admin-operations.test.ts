import { describe, it, expect } from 'vitest';
import { AdminOperationsManager } from '../src/admin/admin_manager';

describe('Gate 11.2: Admin Operations & Command Center Validation', () => {
  it('should allow admin to verify workers and record audit trails', () => {
    const adminOps = new AdminOperationsManager();

    expect(adminOps.getWorkerStatus('wrk-001')).toBe('PENDING');

    adminOps.verifyWorker('adm-001', 'wrk-001', 'VERIFIED');

    expect(adminOps.getWorkerStatus('wrk-001')).toBe('VERIFIED');

    const logs = adminOps.getAuditLogs();
    expect(logs.length).toBe(1);
    expect(logs[0].adminId).toBe('adm-001');
    expect(logs[0].action).toBe('WORKER_STATUS_CHANGE_VERIFIED');
    expect(logs[0].targetId).toBe('wrk-001');
  });

  it('should allow admin to intervene in orders with recorded reasons', () => {
    const adminOps = new AdminOperationsManager();

    adminOps.interveneOrder('adm-001', 'ord-999', 'FORCE_CANCEL', 'Customer requested cancellation due to delay');

    const logs = adminOps.getAuditLogs();
    expect(logs.length).toBe(1);
    expect(logs[0].action).toBe('ORDER_INTERVENTION_FORCE_CANCEL');
    expect(logs[0].reason).toContain('Customer requested cancellation');
  });
});
