import { describe, it, expect } from 'vitest';
import { WorkerController } from './worker_controller.js';
import { WorkerOrderCardFormatter } from '../widgets/worker_order_card.js';
import { OrderRepository } from '../../../orders/domain/order_repository.js';

class MockWorkerRepo implements OrderRepository {
  async createOrder(req: any) { return {} as any; }
  async acceptOrder(orderId: string) {
    return {
      id: orderId,
      customerId: 'cust-1',
      workerId: 'worker-777',
      serviceId: 'plumbing',
      addressText: 'Ismailia Center',
      status: 'Accepted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
  async getOrder(orderId: string) { return {} as any; }
}

describe('Gate 8.4: Worker Experience & Dual Role Simulation Validation', () => {
  it('should format worker order card summary correctly', () => {
    const summary = WorkerOrderCardFormatter.formatSummary({
      orderId: 'ORD-W-01',
      serviceName: 'Electrical Repair',
      addressText: 'Suez Canal Street'
    });
    expect(summary).toBe('Order [ORD-W-01]: Electrical Repair at Suez Canal Street');
  });

  it('should execute worker order journey (Accept -> Start -> Complete)', async () => {
    const repo = new MockWorkerRepo();
    const controller = new WorkerController(repo);

    expect(controller.getStatus()).toBe('Incoming');

    const accepted = await controller.acceptOrder('ORD-W-01');
    expect(controller.getStatus()).toBe('Accepted');
    expect(accepted.workerId).toBe('worker-777');

    const started = await controller.startWork('ORD-W-01');
    expect(started.status).toBe('Started');
    expect(controller.getStatus()).toBe('Started');

    const completed = await controller.completeWork('ORD-W-01');
    expect(completed.status).toBe('Completed');
    expect(controller.getStatus()).toBe('Completed');
  });
});
