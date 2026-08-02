export interface CreateOrderRequest {
  customerId: string;
  serviceId: string;
  addressText: string;
}

export interface OrderEntity {
  id: string;
  customerId: string;
  workerId?: string;
  serviceId: string;
  addressText: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRepository {
  createOrder(request: CreateOrderRequest): Promise<OrderEntity>;
  acceptOrder(orderId: string): Promise<OrderEntity>;
  getOrder(orderId: string): Promise<OrderEntity>;
}
