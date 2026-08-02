export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
}

export interface UserEntity {
  id: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}
