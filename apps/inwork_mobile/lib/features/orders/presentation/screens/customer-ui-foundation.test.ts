import { describe, it, expect } from 'vitest';
import { OrderTimelineMapper } from '../widgets/order_status_timeline.js';
import { AppButton } from '../../../../core/design_system/components/app_button.ts';
import { OrderController } from '../controllers/order_controller.js';
import { OrderRepository } from '../../domain/order_repository.js';

class MockRepo implements OrderRepository {
  async createOrder(req: any) {
    return { id: 'UI-ORD-01', customerId: req.customerId, serviceId: req.serviceId, addressText: req.addressText, status: 'Created', createdAt: '', updatedAt: '' };
  }
  async acceptOrder(id: string) { return {} as any; }
  async getOrder(id: string) { return {} as any; }
}

describe('Gate 8.1 & 8.3: Customer Experience UI & Design System Validation', () => {
  it('should map order statuses correctly to timeline steps', () => {
    const timeline = OrderTimelineMapper.getStepsForStatus('Accepted');
    
    expect(timeline[0].title).toBe('Created');
    expect(timeline[0].status).toBe('completed');
    
    expect(timeline[2].title).toBe('Accepted');
    expect(timeline[2].status).toBe('current');

    expect(timeline[4].title).toBe('Completed');
    expect(timeline[4].status).toBe('upcoming');
  });

  it('should provide correct design system button configurations', () => {
    const primaryStyle = AppButton.getStyles('primary');
    expect(primaryStyle.backgroundColor).toBe('#0F172A');
    expect(primaryStyle.color).toBe('#FFFFFF');
  });

  it('should successfully execute create order flow through controller and state', async () => {
    const repo = new MockRepo();
    const controller = new OrderController(repo);

    await controller.createOrder('cust-100', 'cleaning', 'Ismailia Downtown');
    const state = controller.getState();

    expect(state.status).toBe('Created');
    expect(state.orderId).toBe('UI-ORD-01');
  });
});
