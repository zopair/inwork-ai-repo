export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
}

export const RolePermissions: Record<UserRole, string[]> = {
  [UserRole.CUSTOMER]: ['ORDER_CREATE', 'ORDER_RATE', 'ORDER_VIEW'],
  [UserRole.WORKER]: ['ORDER_ACCEPT', 'ORDER_START', 'ORDER_COMPLETE', 'ORDER_VIEW'],
  [UserRole.ADMIN]: ['ORDER_CREATE', 'ORDER_ACCEPT', 'ORDER_START', 'ORDER_COMPLETE', 'ORDER_RATE', 'ORDER_VIEW', 'USER_MANAGE']
};

export class RBACGuard {
  static hasPermission(role: UserRole, permission: string): boolean {
    const permissions = RolePermissions[role] || [];
    return permissions.includes(permission);
  }
}
