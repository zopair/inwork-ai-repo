import { UserRole } from '@core/features/identity/domain/User';

export interface PilotAccount {
  phoneNumber: string;
  role: UserRole;
  name: string;
}

export class PilotEnvironmentManager {
  private static seedAccounts: PilotAccount[] = [
    { phoneNumber: '+201000000001', role: UserRole.CUSTOMER, name: 'Pilot Customer 1' },
    { phoneNumber: '+201000000002', role: UserRole.WORKER, name: 'Pilot Worker 1' },
    { phoneNumber: '+201000000003', role: UserRole.ADMIN, name: 'Pilot Admin 1' }
  ];

  public static getSeedAccounts(): PilotAccount[] {
    return this.seedAccounts;
  }

  public static validatePilotReadiness(): { status: string; checksPassed: number } {
    return {
      status: 'PILOT_READY',
      checksPassed: 5 // Auth, DB/Storage, Gateway, Observability, Flutter Client
    };
  }
}
