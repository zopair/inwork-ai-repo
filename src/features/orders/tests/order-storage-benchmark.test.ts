import { describe, it, expect } from 'vitest';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';
import { AssignWorkerUseCase } from '../application/use-cases/AssignWorkerUseCase';
import { AcceptOrderUseCase } from '../application/use-cases/AcceptOrderUseCase';
import { StartWorkUseCase } from '../application/use-cases/StartWorkUseCase';
import { CompleteOrderUseCase } from '../application/use-cases/CompleteOrderUseCase';
import { RateOrderUseCase } from '../application/use-cases/RateOrderUseCase';

class DualBenchmarkProvider extends InMemoryStorageProvider {
  public apiCallsCount = 0;
  public totalLatencyMs = 0;

  async getFile(path: string) {
    const start = performance.now();
    const res = await super.getFile(path);
    this.apiCallsCount++;
    this.totalLatencyMs += (performance.now() - start);
    return res;
  }

  async saveFile(path: string, contentData: unknown, message: string, sha?: string) {
    const start = performance.now();
    const res = await super.saveFile(path, contentData, message, sha);
    this.apiCallsCount++;
    this.totalLatencyMs += (performance.now() - start);
    return res;
  }
}

describe('Gate 2: Dual-Mode Storage & Lifecycle Benchmark', () => {
  
  it('Benchmark A: Sequential Processing (50 Orders)', async () => {
    const provider = new DualBenchmarkProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    let counter = 0;
    const idGen = { generate: () => `ORDER-SEQ-${++counter}` };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    const assignWorker = new AssignWorkerUseCase(repository, clock);
    const acceptOrder = new AcceptOrderUseCase(repository, clock);
    const startWork = new StartWorkUseCase(repository, clock);
    const completeOrder = new CompleteOrderUseCase(repository, clock);
    const rateOrder = new RateOrderUseCase(repository);

    const orderCount = 50;
    const start = performance.now();

    for (let i = 0; i < orderCount; i++) {
      const orderId = await createOrder.execute({
        customerId: `customer-seq-${i}`,
        serviceId: 'plumbing',
        addressText: 'Ismailia'
      });
      await assignWorker.execute(orderId, 'worker-A');
      await acceptOrder.execute(orderId);
      await startWork.execute(orderId);
      await completeOrder.execute(orderId, { amount: 200, method: 'Cash' });
      await rateOrder.execute(orderId, 5, 'Good');
    }

    const duration = performance.now() - start;

    console.log(`\n📊 --- BENCHMARK A: SEQUENTIAL REPORT ---`);
    console.log({
      mode: 'Sequential',
      totalOrders: orderCount,
      durationMs: duration.toFixed(2),
      avgPerOrderMs: (duration / orderCount).toFixed(2),
      totalApiCalls: provider.apiCallsCount
    });

    expect(provider.apiCallsCount).toBeGreaterThan(0);
    expect(duration).toBeDefined();
  }, 35000);

  it('Benchmark B: Concurrent Processing (50 Orders Simultaneously)', async () => {
    const provider = new DualBenchmarkProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    let counter = 0;
    const idGen = { generate: () => `ORDER-CONC-${++counter}` };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    const assignWorker = new AssignWorkerUseCase(repository, clock);
    const acceptOrder = new AcceptOrderUseCase(repository, clock);
    const startWork = new StartWorkUseCase(repository, clock);
    const completeOrder = new CompleteOrderUseCase(repository, clock);
    const rateOrder = new RateOrderUseCase(repository);

    const orderCount = 50;
    const start = performance.now();

    const processLifecycle = async (index: number) => {
      const orderId = await createOrder.execute({
        customerId: `customer-conc-${index}`,
        serviceId: 'electrical',
        addressText: 'Ismailia'
      });
      await assignWorker.execute(orderId, 'worker-B');
      await acceptOrder.execute(orderId);
      await startWork.execute(orderId);
      await completeOrder.execute(orderId, { amount: 350, method: 'Visa' });
      await rateOrder.execute(orderId, 5, 'Outstanding');
    };

    const promises = Array.from({ length: orderCount }, (_, i) => processLifecycle(i));
    await Promise.all(promises);

    const duration = performance.now() - start;

    console.log(`\n📊 --- BENCHMARK B: CONCURRENT REPORT ---`);
    console.log({
      mode: 'Concurrent',
      totalOrders: orderCount,
      durationMs: duration.toFixed(2),
      avgPerOrderMs: (duration / orderCount).toFixed(2),
      totalApiCalls: provider.apiCallsCount
    });

    expect(provider.apiCallsCount).toBeGreaterThan(0);
    expect(duration).toBeDefined();
  }, 15000);

});
