import { OrderRepository } from '../../infrastructure/OrderRepository';

export class RateOrderUseCase {
  constructor(private orderRepo: OrderRepository) {}

  async execute(orderId: string, score: number, comment?: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.rateOrder(score, comment);
    await this.orderRepo.save(order);
  }
}
