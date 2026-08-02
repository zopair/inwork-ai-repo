import { describe, it, expect } from 'vitest';
import { PilotTelemetryManager } from '../src/monitoring/telemetry_manager';

describe('Gate 11.1: Pilot Monitoring Dashboard & Telemetry Validation', () => {
  it('should record pilot events with correlation ID and correct event types', () => {
    const telemetry = new PilotTelemetryManager();

    telemetry.recordEvent({
      userId: 'usr-123',
      orderId: 'ord-456',
      correlationId: 'TRACE-MONITOR-001',
      eventType: 'ORDER_CREATED',
      metadata: { serviceTier: 'mvp' }
    });

    const events = telemetry.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].correlationId).toBe('TRACE-MONITOR-001');
    expect(events[0].eventType).toBe('ORDER_CREATED');
    expect(events[0].eventId).toBeDefined();
  });

  it('should aggregate business and technical metrics for the pilot dashboard', () => {
    const telemetry = new PilotTelemetryManager();
    const metrics = telemetry.getDashboardMetrics();

    expect(metrics.business.ordersCreated).toBeDefined();
    expect(metrics.technical.averageResponseTimeMs).toBeDefined();
    expect(metrics.totalEventsLogged).toBe(0);
  });
});
