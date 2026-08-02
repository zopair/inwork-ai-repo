import { UserRole } from './User';

export interface AuthClaims {
  userId: string;
  role: UserRole;
  issuedAt: number;
  expiresAt: number;
}
