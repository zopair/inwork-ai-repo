import { describe, it, expect } from 'vitest';
import { ApiServerApp } from '../src/app';

describe('Gate 9.3: Production Operations & Observability Validation', () => {
  it('should return healthy and ready status from operations endpoints', async () => {
    const app = new ApiServerApp();

    const healthRes = await app.handleRequest('GET', '/health', {});
    expect(healthRes.success).toBe(true);
    expect(healthRes.data.status).toBe('healthy');
    expect(healthRes.data.service).toBe('inwork-api');

    const readyRes = await app.handleRequest('GET', '/ready', {});
    expect(readyRes.success).toBe(true);
    expect(readyRes.data.status).toBe('ready');
  });

  it('should map domain and runtime errors into structured envelope via Global Error Boundary', async () => {
    const app = new ApiServerApp();

    const errorRes = await app.handleRequest('GET', '/api/v1/admin/metrics', {
      'x-correlation-id': 'TRACE-ERR-001'
    });

    expect(errorRes.success).toBe(false);
    expect(errorRes.error.code).toBe('UNAUTHORIZED');
    expect(errorRes.correlationId).toBe('TRACE-ERR-001');
  });

  it('should track request latency, correlation ID, and record structured logs', async () => {
    const app = new ApiServerApp();

    await app.handleRequest('GET', '/health', {
      'x-correlation-id': 'TRACE-OBS-999'
    });

    const logs = app.getLogger().getLogs();
    expect(logs.length).toBeGreaterThan(0);
    
    const lastLog = logs[logs.length - 1];
    expect(lastLog.correlationId).toBe('TRACE-OBS-999');
    expect(lastLog.route).toBe('/health');
    expect(lastLog.durationMs).toBeDefined();
    expect(lastLog.requestId).toBeDefined();
  });
});
