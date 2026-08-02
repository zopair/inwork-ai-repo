import { describe, it, expect } from 'vitest';
import { ResponseEnvelope, OrderDTO, ErrorDTO } from '../../../contracts';

describe('Gate 5.1: API Contracts Structural Validation', () => {
  it('should construct valid ResponseEnvelope conforming to contracts', () => {
    const orderData: OrderDTO = {
      id: 'ORDER-999',
      customerId: 'cust-1',
      serviceId: 'cleaning',
      addressText: 'Ismailia Downtown',
      status: 'Created',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const envelope: ResponseEnvelope<OrderDTO> = {
      success: true,
      data: orderData,
      correlationId: 'corr-xyz-789',
      timestamp: new Date().toISOString()
    };

    expect(envelope.success).toBe(true);
    expect(envelope.data?.id).toBe('ORDER-999');
    expect(envelope.correlationId).toBe('corr-xyz-789');
  });

  it('should construct valid error envelope matching ErrorDTO', () => {
    const errorDto: ErrorDTO = {
      code: 'UNAUTHORIZED',
      message: 'Access denied for action',
      retryable: false
    };

    const envelope: ResponseEnvelope<null> = {
      success: false,
      error: errorDto,
      correlationId: 'corr-err-456',
      timestamp: new Date().toISOString()
    };

    expect(envelope.success).toBe(false);
    expect(envelope.error?.code).toBe('UNAUTHORIZED');
    expect(envelope.error?.retryable).toBe(false);
  });
});
