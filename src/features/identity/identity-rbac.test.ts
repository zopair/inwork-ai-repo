import { describe, it, expect } from 'vitest';
import { UserRole, RBACGuard } from './domain/Role';
import { UserAggregate } from './domain/User';

describe('Gate 7.2: Authentication & RBAC Foundation', () => {
  it('should correctly evaluate role-based permissions', () => {
    // Customer permissions
    expect(RBACGuard.hasPermission(UserRole.CUSTOMER, 'ORDER_CREATE')).toBe(true);
    expect(RBACGuard.hasPermission(UserRole.CUSTOMER, 'ORDER_ACCEPT')).toBe(false);

    // Worker permissions
    expect(RBACGuard.hasPermission(UserRole.WORKER, 'ORDER_ACCEPT')).toBe(true);
    expect(RBACGuard.hasPermission(UserRole.WORKER, 'ORDER_CREATE')).toBe(false);

    // Admin permissions
    expect(RBACGuard.hasPermission(UserRole.ADMIN, 'USER_MANAGE')).toBe(true);
  });

  it('should instantiate UserAggregate correctly', () => {
    const user = new UserAggregate({
      id: 'USR-001',
      name: 'Aly Zopair',
      role: UserRole.ADMIN,
      phone: '+201000000000'
    });

    expect(user.getId()).toBe('USR-001');
    expect(user.getRole()).toBe(UserRole.ADMIN);
    expect(user.getProps().name).toBe('Aly Zopair');
  });
});
