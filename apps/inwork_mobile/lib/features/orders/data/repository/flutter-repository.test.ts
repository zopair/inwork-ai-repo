import { describe, it, expect } from 'vitest';
import { OrderRepositoryImpl } from './order_repository_impl.js';

describe('Gate 7.4.3: Flutter Repository & Error Mapping Validation', () => {
  it('should successfully map backend response envelope to domain entity through repository', async () => {
    const mockApiClient = async (endpoint: string, body: any) => {
      return {
        success: true,
        data: {
          id: 'ORDER-REPO-01',
          customerId: body.customerId ?? 'cust-1',
          serviceId: body.serviceId ?? 'plumbing',
          addressText: body.addressText ?? 'Ismailia',
          status: 'Created',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        correlationId: 'TRACE-REPO-123',
        timestamp: new Date().toISOString()
      };
    };

    const repository = new OrderRepositoryImpl(mockApiClient);
    const order = await repository.createOrder({
      customerId: 'cust-1',
      serviceId: 'plumbing',
      addressText: 'Ismailia Sector 1'
    });

    expect(order.id).toBe('ORDER-REPO-01');
    expect(order.status).toBe('Created');
    expect(order.customerId).toBe('cust-1');
  });

  it('should correctly map error envelope to domain failure', async () => {
    const mockApiClient = async () => {
      return {
        success: false,
        error: {
          code: 'ORDER_ALREADY_ASSIGNED',
          message: 'Worker conflict detected',
          retryable: false
        },
        correlationId: 'TRACE-ERR-456',
        timestamp: new Date().toISOString()
      };
    };

    const repository = new OrderRepositoryImpl(mockApiClient);
    
    await expect(
      repository.createOrder({ customerId: 'c1', serviceId: 's1', addressText: 'a1' })
    ).rejects.toThrowError('Worker conflict detected');
  });
});
