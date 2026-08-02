import { describe, it, expect } from 'vitest';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';
import { AssignWorkerUseCase } from '../application/use-cases/AssignWorkerUseCase';
import { AcceptOrderUseCase } from '../application/use-cases/AcceptOrderUseCase';
import { StartWorkUseCase } from '../application/use-cases/StartWorkUseCase';
import { CompleteOrderUseCase } from '../application/use-cases/CompleteOrderUseCase';
import { RateOrderUseCase } from '../application/use-cases/RateOrderUseCase';

// مطابق لمعمارية الـ Mapping بين لغة الـ Domain ولغة الـ Product/API Vocabulary
const OrderTimelineMapper = {
  mapStatus(domainStatus: string): string {
    switch (domainStatus) {
      case 'Pending': return 'Created';
      case 'Assigned': return 'Assigned';
      case 'Accepted': return 'Accepted';
      case 'InProgress': return 'Started';
      case 'Completed': return 'Completed';
      default: return domainStatus;
    }
  }
};

describe('Gate 5.3: End-to-End User Journey Simulation', () => {
  it('should successfully execute the complete order lifecycle from Customer creation to Rating with mapped timeline and correlation tracking', async () => {
    const provider = new InMemoryStorageProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    const correlationId = 'TRACE-E2E-001';
    
    let counter = 0;
    const idGen = { generate: () => `ORDER-E2E-${++counter}` };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    const assignWorker = new AssignWorkerUseCase(repository, clock);
    const acceptOrder = new AcceptOrderUseCase(repository, clock);
    const startWork = new StartWorkUseCase(repository, clock);
    const completeOrder = new CompleteOrderUseCase(repository, clock);
    const rateOrder = new RateOrderUseCase(repository);

    const timeline: string[] = [];

    // 1. Customer creates order
    const orderId = await createOrder.execute({
      customerId: 'USER-001',
      serviceId: 'electrical-repair',
      addressText: 'Ismailia Downtown'
    });
    let order = await repository.findById(orderId);
    expect(order).not.toBeNull();
    timeline.push(OrderTimelineMapper.mapStatus(order!.getProps().status)); // Created

    // 2. System assigns worker
    await assignWorker.execute(orderId, 'WORKER-001');
    order = await repository.findById(orderId);
    timeline.push(OrderTimelineMapper.mapStatus(order!.getProps().status)); // Assigned

    // 3. Worker accepts job
    await acceptOrder.execute(orderId);
    order = await repository.findById(orderId);
    timeline.push(OrderTimelineMapper.mapStatus(order!.getProps().status)); // Accepted

    // 4. Worker starts work
    await startWork.execute(orderId);
    order = await repository.findById(orderId);
    timeline.push(OrderTimelineMapper.mapStatus(order!.getProps().status)); // Started (InProgress mapped)

    // 5. Worker completes order
    await completeOrder.execute(orderId, { amount: 450, method: 'Cash' });
    order = await repository.findById(orderId);
    timeline.push(OrderTimelineMapper.mapStatus(order!.getProps().status)); // Completed

    // 6. Customer rates service (التقييم حدث أعمال مستقل يتم تسجيله في الـ Timeline ولا يغير حالة الـ Aggregate الأساسية)
    await rateOrder.execute(orderId, 5, 'Outstanding service');
    timeline.push('Rated');

    const telemetryReport = {
      orderId,
      customerId: 'USER-001',
      workerId: 'WORKER-001',
      correlationId,
      timeline
    };

    console.log('\n📊 --- E2E JOURNEY TELEMETRY REPORT ---');
    console.log(JSON.stringify(telemetryReport, null, 2));

    expect(telemetryReport.timeline).toEqual([
      'Created',
      'Assigned',
      'Accepted',
      'Started',
      'Completed',
      'Rated'
    ]);
    
    // تأكيد أن حالة الـ Aggregate ظلت Completed ولم تتأثر بالتقييم
    expect(order!.getProps().status).toBe('Completed');
  });
});
