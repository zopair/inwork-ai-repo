import { describe, it, expect } from 'vitest';
import { ApiServerApp } from '../src/app';
import { UserRole } from '../../../src/features/identity/domain/User';

describe('Gate 9.2: Production API Runtime & Gateway Integration', () => {
  it('should successfully handle OTP request and verification HTTP flow', async () => {
    const app = new ApiServerApp();
    const phone = '+201555555555';

    // 1. Request OTP
    const reqRes = await app.handleRequest('POST', '/api/v1/auth/otp-request', {}, { phoneNumber: phone });
    expect(reqRes.success).toBe(true);
    expect(reqRes.data.otpCode).toBeDefined();

    // 2. Verify OTP
    const verifyRes = await app.handleRequest('POST', '/api/v1/auth/otp-verify', {}, {
      phoneNumber: phone,
      otpCode: reqRes.data.otpCode,
      role: UserRole.ADMIN
    });

    expect(verifyRes.success).toBe(true);
    expect(verifyRes.data.accessToken).toBeDefined();
    expect(verifyRes.data.user.role).toBe('ADMIN');
  });

  it('should enforce RBAC security guards on protected routes', async () => {
    const app = new ApiServerApp();
    const phone = '+201666666666';

    const reqRes = await app.handleRequest('POST', '/api/v1/auth/otp-request', {}, { phoneNumber: phone });
    const verifyRes = await app.handleRequest('POST', '/api/v1/auth/otp-verify', {}, {
      phoneNumber: phone,
      otpCode: reqRes.data.otpCode,
      role: UserRole.CUSTOMER // محاولة دخول بـ Customer لتوجيه يتطلب Admin
    });

    const token = verifyRes.data.accessToken;

    // محاولة الوصول لمسار المشرف بـ Token مستخدم عادي
    const protectedRes = await app.handleRequest('GET', '/api/v1/admin/metrics', {
      authorization: `Bearer ${token}`
    });

    expect(protectedRes.success).toBe(false);
    expect(protectedRes.error.code).toBe('FORBIDDEN_INSUFFICIENT_PERMISSIONS');
  });

  it('should allow authorized access when correct role claims are presented', async () => {
    const app = new ApiServerApp();
    const phone = '+201777777777';

    const reqRes = await app.handleRequest('POST', '/api/v1/auth/otp-request', {}, { phoneNumber: phone });
    const verifyRes = await app.handleRequest('POST', '/api/v1/auth/otp-verify', {}, {
      phoneNumber: phone,
      otpCode: reqRes.data.otpCode,
      role: UserRole.ADMIN
    });

    const token = verifyRes.data.accessToken;

    const protectedRes = await app.handleRequest('GET', '/api/v1/admin/metrics', {
      authorization: `Bearer ${token}`,
      'x-correlation-id': 'TRACE-E2E-RUNTIME-001'
    });

    expect(protectedRes.success).toBe(true);
    expect(protectedRes.data.systemStatus).toBe('HEALTHY');
    expect(protectedRes.correlationId).toBe('TRACE-E2E-RUNTIME-001');
  });
});
