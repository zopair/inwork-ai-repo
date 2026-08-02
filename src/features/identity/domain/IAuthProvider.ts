import { UserAggregate } from './User';

export interface TokenPayload {
  userId: string;
  role: string;
  correlationId: string;
}

export interface IAuthProvider {
  validateToken(token: string): Promise<TokenPayload | null>;
  getUserById(userId: string): Promise<UserAggregate | null>;
}
