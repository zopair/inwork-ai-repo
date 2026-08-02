import { UserEntity, UserRole } from '../domain/User';
import { AuthSession } from '../domain/AuthSession';
import { AuthClaims } from '../domain/AuthClaims';

export class AuthService {
  private otps: Map<string, string> = new Map();
  private users: Map<string, UserEntity> = new Map();

  constructor() {
    this.users.set('USER-001', {
      id: 'USER-001',
      phoneNumber: '+201000000000',
      role: UserRole.CUSTOMER,
      isActive: true,
      createdAt: new Date().toISOString()
    });
  }

  public requestOtp(phoneNumber: string): { success: boolean; otpCode: string } {
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    this.otps.set(phoneNumber, otpCode);
    return { success: true, otpCode };
  }

  public verifyOtp(phoneNumber: string, otpCode: string, role: UserRole = UserRole.CUSTOMER): AuthSession {
    const storedOtp = this.otps.get(phoneNumber);
    if (!storedOtp || storedOtp !== otpCode) {
      throw new Error('INVALID_OTP_CODE');
    }

    let user = Array.from(this.users.values()).find(u => u.phoneNumber === phoneNumber);
    if (!user) {
      user = {
        id: `USER-${Date.now()}`,
        phoneNumber,
        role,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      this.users.set(user.id, user);
    }

    // إشراك الـ userId الحقيقي والكامل في هيكل التوكن لتفادي أي لبس
    const accessToken = `jwt-access-token:${user.id}:${user.role}:${Date.now()}`;
    const refreshToken = `jwt-refresh-token:${user.id}`;

    return {
      accessToken,
      refreshToken,
      user,
      expiresIn: 3600
    };
  }

  public validateToken(token: string): AuthClaims {
    if (!token || !token.startsWith('jwt-access-token:')) {
      throw new Error('INVALID_TOKEN');
    }
    const parts = token.replace('jwt-access-token:', '').split(':');
    if (parts.length < 2) {
      throw new Error('INVALID_TOKEN');
    }
    const userId = parts[0];
    const role = parts[1] as UserRole;

    return {
      userId,
      role,
      issuedAt: Date.now() - 1000,
      expiresAt: Date.now() + 3600000
    };
  }

  public loginAsAdmin(): AuthSession {
    const adminUser: UserEntity = {
      id: `USER-ADMIN-${Date.now()}`,
      phoneNumber: '+201999999999',
      role: UserRole.ADMIN,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    this.users.set(adminUser.id, adminUser);

    const accessToken = `jwt-access-token:${adminUser.id}:${adminUser.role}:${Date.now()}`;
    const refreshToken = `jwt-refresh-token:${adminUser.id}`;

    return {
      accessToken,
      refreshToken,
      user: adminUser,
      expiresIn: 3600
    };
  }
}
