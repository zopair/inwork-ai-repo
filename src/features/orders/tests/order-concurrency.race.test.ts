import { describe, it, expect } from 'vitest';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';
import { AssignWorkerUseCase } from '../application/use-cases/AssignWorkerUseCase';

describe('Order Acceptance Real Concurrency & Race Condition Test', () => {
  it('should allow exactly one worker to succeed and reject others when 20 workers race simultaneously', async () => {
    const provider = new InMemoryStorageProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    const idGen = { generate: () => 'ORDER-REAL-RACE-001' };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    const assignWorker = new AssignWorkerUseCase(repository, clock);

    const orderId = await createOrder.execute({
      customerId: 'customer-1',
      serviceId: 'plumbing',
      addressText: 'Ismailia'
    });

    const workerCount = 20;
    const workersPromises = Array.from({ length: workerCount }, (_, i) => 
      assignWorker.execute(orderId, `worker-${i}`)
    );

    const results = await Promise.allSettled(workersPromises);

    const successful = results.filter(x => x.status === 'fulfilled');
    const failed = results.filter(x => x.status === 'rejected');

    expect(successful.length).toBe(1);
    expect(failed.length).toBe(workerCount - 1);

    const finalOrder = await repository.findById(orderId);
    expect(finalOrder).not.toBeNull();
    expect(finalOrder!.getProps().status).toBe('Assigned');
    expect(finalOrder!.getProps().workerId).toBeDefined();

    console.log(`✅ Real Concurrency Proof Passed: 1 Success, ${failed.length} Rejections handled safely!`);
  });
});
