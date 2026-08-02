export type OrderStatusType =
  | "Created"
  | "Assigned"
  | "Accepted"
  | "Started"
  | "Completed"
  | "Rated";

export interface OrderDTO {
  id: string;
  customerId: string;
  workerId?: string;
  serviceId: string;
  addressText: string;
  status: OrderStatusType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequestDTO {
  customerId: string;
  serviceId: string;
  addressText: string;
}
