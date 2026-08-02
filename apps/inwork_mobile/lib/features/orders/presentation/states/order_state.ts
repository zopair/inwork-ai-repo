export type OrderStatus = 
  | 'Initial'
  | 'Loading'
  | 'Created'
  | 'Assigned'
  | 'Accepted'
  | 'Started'
  | 'Completed'
  | 'Rated'
  | 'Error';

export interface OrderState {
  status: OrderStatus;
  orderId?: string;
  correlationId?: string;
  errorMessage?: string;
  data?: any;
}

export const initialOrderState: OrderState = {
  status: 'Initial'
};
