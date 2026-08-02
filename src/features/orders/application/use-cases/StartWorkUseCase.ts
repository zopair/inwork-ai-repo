import { OrderRepository } from '../../infrastructure/OrderRepository';

export class StartWorkUseCase {
  constructor(private orderRepo: OrderRepository, private clock: { now: () => string }) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.startOrder(this.clock.now());
    await this.orderRepo.save(order);
  }
}
