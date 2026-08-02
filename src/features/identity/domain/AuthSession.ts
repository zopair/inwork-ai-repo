import { UserEntity } from './User';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
  expiresIn: number;
}
