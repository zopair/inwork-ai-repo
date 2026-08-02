// CreateOrderScreen Presentation Logic
import { OrderController } from '../controllers/order_controller';

export class CreateOrderScreenModel {
  static async handleCreateOrder(
    controller: OrderController,
    customerId: string,
    serviceId: string,
    addressText: string
  ) {
    if (!customerId || !serviceId || !addressText) {
      throw new Error('All fields are required');
    }
    await controller.createOrder(customerId, serviceId, addressText);
  }
}
