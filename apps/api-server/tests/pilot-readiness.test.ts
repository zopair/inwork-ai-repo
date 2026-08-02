import { describe, it, expect } from 'vitest';
import { PilotEnvironmentManager } from '../src/pilot/pilot_manager';
import { UserRole } from '@core/features/identity/domain/User';

describe('Gate 10.4: Pilot Environment & First User Readiness Validation', () => {
  it('should provide pre-configured seed accounts for pilot testing', () => {
    const accounts = PilotEnvironmentManager.getSeedAccounts();
    expect(accounts.length).toBe(3);
    
    const customer = accounts.find(a => a.role === UserRole.CUSTOMER);
    const worker = accounts.find(a => a.role === UserRole.WORKER);
    const admin = accounts.find(a => a.role === UserRole.ADMIN);

    expect(customer).toBeDefined();
    expect(worker).toBeDefined();
    expect(admin).toBeDefined();
  });

  it('should confirm overall system readiness status for pilot launch', () => {
    const readiness = PilotEnvironmentManager.validatePilotReadiness();
    expect(readiness.status).toBe('PILOT_READY');
    expect(readiness.checksPassed).toBe(5);
  });
});
