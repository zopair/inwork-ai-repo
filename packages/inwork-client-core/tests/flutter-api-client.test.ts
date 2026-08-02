import { describe, it, expect } from 'vitest';
import { InWorkApiClient } from '../src/api_client';

describe('Gate 10.3: Flutter Production Connectivity & API Client', () => {
  it('should initialize ApiClient with correct base url and construct requests with auth and correlation ID', async () => {
    const client = new InWorkApiClient({ baseUrl: 'http://localhost:3000/api/v1' });

    const req = await client.request(
      'POST',
      '/auth/otp-request',
      'mock-jwt-token-123',
      { phoneNumber: '+201000000000' },
      'TRACE-CLIENT-001'
    );

    expect(req.url).toBe('http://localhost:3000/api/v1/auth/otp-request');
    expect(req.method).toBe('POST');
    expect(req.headers['Authorization']).toBe('Bearer mock-jwt-token-123');
    expect(req.headers['x-correlation-id']).toBe('TRACE-CLIENT-001');
    expect(req.body.phoneNumber).toBe('+201000000000');
  });

  it('should handle unauthenticated requests gracefully without token header', async () => {
    const client = new InWorkApiClient({ baseUrl: 'http://localhost:3000/api/v1' });

    const req = await client.request('GET', '/health');

    expect(req.headers['Authorization']).toBeUndefined();
    expect(req.headers['x-correlation-id']).toBeDefined();
  });
});
