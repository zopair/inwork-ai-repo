import { OrderAggregate, OrderProps } from '../domain/Order';
import { InWorkStorageEngine } from '@inwork/storage-engine';

export class OrderRepository {
  constructor(private engine: InWorkStorageEngine) {}

  async save(order: OrderAggregate): Promise<void> {
    const props = order.getProps();
    await this.engine.saveRecord('orders', props, props.status);
  }

  async findById(id: string): Promise<OrderAggregate | null> {
    const props = await this.engine.getRecord<OrderProps>('orders', id);
    if (!props) return null;
    return OrderAggregate.reconstitute(props);
  }
}
