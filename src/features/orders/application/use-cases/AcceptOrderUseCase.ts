import { OrderRepository } from '../../infrastructure/OrderRepository';

export class AcceptOrderUseCase {
  constructor(private orderRepo: OrderRepository, private clock: { now: () => string }) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.acceptOrder(this.clock.now());
    await this.orderRepo.save(order);
  }
}
