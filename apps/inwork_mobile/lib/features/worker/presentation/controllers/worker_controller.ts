import { OrderRepository } from '../../../orders/domain/order_repository.js';

export type WorkerOrderStatus = 'Incoming' | 'Accepted' | 'Started' | 'Completed';

export class WorkerController {
  private currentStatus: WorkerOrderStatus = 'Incoming';
  private activeOrderId?: string;

  constructor(private readonly orderRepository: OrderRepository) {}

  public getStatus(): WorkerOrderStatus {
    return this.currentStatus;
  }

  public async acceptOrder(orderId: string) {
    const updated = await this.orderRepository.acceptOrder(orderId);
    this.activeOrderId = updated.id;
    this.currentStatus = 'Accepted';
    return updated;
  }

  public async startWork(orderId: string) {
    // محاكاة بدء العمل وتحديث الحالة
    this.currentStatus = 'Started';
    return { orderId, status: 'Started' };
  }

  public async completeWork(orderId: string) {
    this.currentStatus = 'Completed';
    return { orderId, status: 'Completed' };
  }
}
