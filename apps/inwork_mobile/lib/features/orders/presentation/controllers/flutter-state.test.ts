import { describe, it, expect } from 'vitest';
import { OrderController } from './order_controller';
import { OrderRepository } from '../../domain/order_repository';

class MockOrderRepository implements OrderRepository {
  async createOrder(request: any) {
    return {
      id: 'ORDER-STATE-01',
      customerId: request.customerId,
      serviceId: request.serviceId,
      addressText: request.addressText,
      status: 'Created',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async acceptOrder(orderId: string) {
    return {
      id: orderId,
      customerId: 'cust-1',
      serviceId: 'plumbing',
      addressText: 'Ismailia',
      status: 'Accepted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async getOrder(orderId: string) {
    return {} as any;
  }
}

describe('Gate 7.5: Flutter State Management & Controller Validation', () => {
  it('should transition through Loading and Created states successfully', async () => {
    const repo = new MockOrderRepository();
    const controller = new OrderController(repo);

    expect(controller.getState().status).toBe('Initial');

    const states: string[] = [];
    controller.subscribe((state) => {
      states.push(state.status);
    });

    await controller.createOrder('cust-1', 'plumbing', 'Ismailia Corniche');

    expect(states).toContain('Loading');
    expect(states).toContain('Created');
    expect(controller.getState().orderId).toBe('ORDER-STATE-01');
    expect(controller.getState().status).toBe('Created');
  });

  it('should handle error state correctly when creation fails', async () => {
    const failingRepo = new MockOrderRepository();
    failingRepo.createOrder = async () => { throw new Error('Network timeout'); };

    const controller = new OrderController(failingRepo);
    await controller.createOrder('cust-1', 'plumbing', 'Ismailia');

    expect(controller.getState().status).toBe('Error');
    expect(controller.getState().errorMessage).toBe('Network timeout');
  });
});
