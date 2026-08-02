import { OrderRepository, CreateOrderRequest, OrderEntity } from '../../domain/order_repository';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly apiClient: any) {}

  async createOrder(request: CreateOrderRequest): Promise<OrderEntity> {
    const response = await this.apiClient('/orders', request);
    
    if (!response || !response.success) {
      const err = response?.error || { code: 'UNKNOWN_ERROR', message: 'Unknown error occurred' };
      throw new Error(err.message);
    }

    return response.data;
  }

  async acceptOrder(orderId: string): Promise<OrderEntity> {
    const response = await this.apiClient(`/orders/${orderId}/accept`, {});
    
    if (!response || !response.success) {
      const err = response?.error || { code: 'UNKNOWN_ERROR', message: 'Failed to accept order' };
      throw new Error(err.message);
    }

    return response.data;
  }

  async getOrder(orderId: string): Promise<OrderEntity> {
    const response = await this.apiClient(`/orders/${orderId}`, {});
    
    if (!response || !response.success) {
      throw new Error('Failed to fetch order');
    }

    return response.data;
  }
}
