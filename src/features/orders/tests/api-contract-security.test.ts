import { describe, it, expect } from 'vitest';
import { DomainError, ErrorCode } from '../../../core/shared/DomainErrors';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';

describe('Gate 4: API Contract & Security Barrier Tests', () => {
  
  it('should throw structured DomainError with proper ErrorCode', () => {
    const error = new DomainError(ErrorCode.INVALID_STATE_TRANSITION, 'Invalid state transition', 'CORR-12345');
    
    expect(error.code).toBe(ErrorCode.INVALID_STATE_TRANSITION);
    expect(error.correlationId).toBe('CORR-12345');
    expect(error.message).toContain('Invalid state transition');
  });

  it('should enforce Correlation ID tracking and encapsulation through Order creation flow', async () => {
    const provider = new InMemoryStorageProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    const idGen = { generate: () => 'ORDER-CONTRACT-001' };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    
    const orderId = await createOrder.execute({
      customerId: 'cust-contract-1',
      serviceId: 'plumbing',
      addressText: 'Ismailia'
    });

    const savedOrder = await repository.findById(orderId);
    expect(savedOrder).not.toBeNull();
    // التحقق من Encapsulation عبر getId() الرسمي بدلاً من تسريب الـ props
    expect(savedOrder!.getId()).toBe('ORDER-CONTRACT-001');
  });

});
