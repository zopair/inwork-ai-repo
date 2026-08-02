export interface AuditLog {
  auditId: string;
  adminId: string;
  action: string;
  targetId: string;
  timestamp: string;
  reason?: string;
}

export class AdminOperationsManager {
  private auditLogs: AuditLog[] = [];
  private workersStatus: Record<string, 'PENDING' | 'VERIFIED' | 'SUSPENDED'> = {
    'wrk-001': 'PENDING',
    'wrk-002': 'VERIFIED'
  };

  public verifyWorker(adminId: string, workerId: string, status: 'VERIFIED' | 'SUSPENDED'): void {
    this.workersStatus[workerId] = status;
    this.logAudit(adminId, `WORKER_STATUS_CHANGE_${status}`, workerId, 'Worker verification update');
  }

  public interveneOrder(adminId: string, orderId: string, action: string, reason: string): void {
    this.logAudit(adminId, `ORDER_INTERVENTION_${action}`, orderId, reason);
  }

  private logAudit(adminId: string, action: string, targetId: string, reason?: string): void {
    this.auditLogs.push({
      auditId: `adt-${Math.random().toString(36).substr(2, 9)}`,
      adminId,
      action,
      targetId,
      timestamp: new Date().toISOString(),
      reason
    });
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public getWorkerStatus(workerId: string): string {
    return this.workersStatus[workerId] || 'UNKNOWN';
  }
}
