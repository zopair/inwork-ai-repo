import { describe, it, expect } from 'vitest';
import { AuthService } from '../services/auth_service';
import { UserRole } from '../domain/User';

describe('Gate 9.1: Real Authentication & RBAC Identity Validation', () => {
  it('should successfully request and verify OTP, issuing tokens and role claims', () => {
    const authService = new AuthService();
    const phone = '+201222222222';

    const reqRes = authService.requestOtp(phone);
    expect(reqRes.success).toBe(true);
    expect(reqRes.otpCode).toBeDefined();

    const session = authService.verifyOtp(phone, reqRes.otpCode, UserRole.WORKER);
    
    expect(session.accessToken).toBeDefined();
    expect(session.refreshToken).toBeDefined();
    expect(session.user.role).toBe(UserRole.WORKER);
    expect(session.user.phoneNumber).toBe(phone);
  });

  it('should reject invalid OTP verification attempts', () => {
    const authService = new AuthService();
    const phone = '+201333333333';
    authService.requestOtp(phone);

    expect(() => {
      authService.verifyOtp(phone, '9999');
    }).toThrowError('INVALID_OTP_CODE');
  });

  it('should successfully validate tokens and extract correct claims', () => {
    const authService = new AuthService();
    const phone = '+201444444444';
    const reqRes = authService.requestOtp(phone);
    const session = authService.verifyOtp(phone, reqRes.otpCode, UserRole.ADMIN);

    const claims = authService.validateToken(session.accessToken);
    expect(claims.userId).toBe(session.user.id);
    expect(claims.role).toBe(UserRole.ADMIN);
  });

  it('should reject malformed or invalid tokens', () => {
    const authService = new AuthService();
    expect(() => {
      authService.validateToken('invalid-token-string');
    }).toThrowError('INVALID_TOKEN');
  });

  it('should preserve identity id inside token claims (Regression Protection)', () => {
    const authService = new AuthService();
    const session = authService.loginAsAdmin();
    const claims = authService.validateToken(session.accessToken);
    
    expect(claims.userId).toBe(session.user.id);
  });
});
