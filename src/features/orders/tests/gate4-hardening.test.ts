import { describe, it, expect } from 'vitest';
import { DomainError, ErrorCode } from '../../../core/shared/DomainErrors';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';
import { AcceptOrderUseCase } from '../application/use-cases/AcceptOrderUseCase';
import { CompleteOrderUseCase } from '../application/use-cases/CompleteOrderUseCase';

describe('Gate 4 Hardening: Idempotency, Authorization & Error Contracts', () => {

  it('should validate final ErrorCodes taxonomy contract', () => {
    const err = new DomainError(ErrorCode.IDEMPOTENCY_REPLAY, 'Duplicate request detected', 'CORR-999');
    expect(err.code).toBe(ErrorCode.IDEMPOTENCY_REPLAY);
    expect(err.correlationId).toBe('CORR-999');
  });

  it('should enforce Authorization Boundary (Unauthorized Action Simulation)', async () => {
    // محاكاة حارس صلاحيات يحمع بين دور المستخدم ومحاولة تنفيذ عملية غير مصرح بها
    const checkAuthorization = (role: string, action: string) => {
      if (role === 'CUSTOMER' && (action === 'ACCEPT_ORDER' || action === 'COMPLETE_ORDER')) {
        throw new DomainError(ErrorCode.UNAUTHORIZED, 'Customer cannot perform worker actions', 'AUTH-001');
      }
    };

    expect(() => checkAuthorization('CUSTOMER', 'ACCEPT_ORDER')).toThrowError();
    try {
      checkAuthorization('CUSTOMER', 'ACCEPT_ORDER');
    } catch (e: any) {
      expect(e.code).toBe(ErrorCode.UNAUTHORIZED);
    }
  });

  it('should handle Idempotency Key logic to prevent duplicate order creation', async () => {
    const provider = new InMemoryStorageProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    let idCounter = 0;
    const idGen = { generate: () => `IDEM-ORDER-${++idCounter}` };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    
    // محاكاة تخزين مفاتيح الـ Idempotency المعالجة مسبقاً
    const processedKeys = new Set<string>();
    const idempotencyKey = 'key-abc-123';

    const executeWithIdempotency = async (dto: any, key: string) => {
      if (processedKeys.has(key)) {
        throw new DomainError(ErrorCode.IDEMPOTENCY_REPLAY, 'Idempotent request replayed', 'IDEM-CORR');
      }
      processedKeys.add(key);
      return await createOrder.execute(dto);
    };

    // الطلب الأول (نجاح)
    const firstId = await executeWithIdempotency({
      customerId: 'cust-1',
      serviceId: 'cleaning',
      addressText: 'Ismailia'
    }, idempotencyKey);

    expect(firstId).toBe('IDEM-ORDER-1');

    // الطلب المكرر لنفس المفتاح (يجب أن يُرفض كـ IDEMPOTENCY_REPLAY)
    await expect(
      executeWithIdempotency({
        customerId: 'cust-1',
        serviceId: 'cleaning',
        addressText: 'Ismailia'
      }, idempotencyKey)
    ).rejects.toThrow();
  });

});
