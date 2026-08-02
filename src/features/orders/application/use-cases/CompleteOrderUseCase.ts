import { OrderRepository } from '../../infrastructure/OrderRepository';

export class CompleteOrderUseCase {
  constructor(private orderRepo: OrderRepository, private clock: { now: () => string }) {}

  async execute(orderId: string, payment: { amount: number; method: string }): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.completeOrder(payment, this.clock.now());
    await this.orderRepo.save(order);
  }
}
