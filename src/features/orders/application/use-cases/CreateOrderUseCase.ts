import { OrderRepository } from '../../infrastructure/OrderRepository';
import { OrderAggregate } from '../../domain/Order';

export class CreateOrderUseCase {
  constructor(private orderRepo: OrderRepository, private clock: { now: () => string }, private idGen: { generate: () => string }) {}

  async execute(input: { customerId: string; serviceId: string; addressText: string }): Promise<string> {
    const id = this.idGen.generate();
    const order = OrderAggregate.create({
      id,
      customerId: input.customerId,
      serviceId: input.serviceId,
      addressText: input.addressText,
    }, this.clock.now());

    await this.orderRepo.save(order);
    return id;
  }
}
