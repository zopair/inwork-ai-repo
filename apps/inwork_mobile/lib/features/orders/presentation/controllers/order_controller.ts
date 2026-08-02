import { OrderState, initialOrderState } from '../states/order_state';
import { OrderRepository } from '../../domain/order_repository';

export class OrderController {
  private state: OrderState = initialOrderState;
  private listeners: ((state: OrderState) => void)[] = [];

  constructor(private readonly orderRepository: OrderRepository) {}

  public getState(): OrderState {
    return this.state;
  }

  public subscribe(listener: (state: OrderState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private setState(newState: OrderState) {
    this.state = newState;
    this.listeners.forEach(l => l(this.state));
  }

  public async createOrder(customerId: string, serviceId: string, addressText: string) {
    this.setState({ status: 'Loading' });
    try {
      const order = await this.orderRepository.createOrder({
        customerId,
        serviceId,
        addressText
      });

      this.setState({
        status: 'Created',
        orderId: order.id,
        correlationId: 'TRACE-STATE-001',
        data: order
      });
    } catch (err: any) {
      this.setState({
        status: 'Error',
        errorMessage: err.message || 'Failed to create order'
      });
    }
  }

  public async acceptOrder(orderId: string) {
    this.setState({ status: 'Loading' });
    try {
      const order = await this.orderRepository.acceptOrder(orderId);
      this.setState({
        status: 'Accepted',
        orderId: order.id,
        data: order
      });
    } catch (err: any) {
      this.setState({
        status: 'Error',
        errorMessage: err.message || 'Failed to accept order'
      });
    }
  }
}
