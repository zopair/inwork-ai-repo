export enum OrderStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Assigned = 'Assigned',
  Accepted = 'Accepted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  Rejected = 'Rejected'
}

export class OrderStateMachine {
  private static transitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Draft]: [OrderStatus.Pending, OrderStatus.Cancelled],
    [OrderStatus.Pending]: [OrderStatus.Assigned, OrderStatus.Cancelled, OrderStatus.Expired],
    [OrderStatus.Assigned]: [OrderStatus.Accepted, OrderStatus.Rejected, OrderStatus.Cancelled],
    [OrderStatus.Accepted]: [OrderStatus.InProgress, OrderStatus.Cancelled],
    [OrderStatus.InProgress]: [OrderStatus.Completed, OrderStatus.Cancelled],
    [OrderStatus.Completed]: [],
    [OrderStatus.Cancelled]: [],
    [OrderStatus.Expired]: [],
    [OrderStatus.Rejected]: [OrderStatus.Pending, OrderStatus.Cancelled]
  };

  static canTransition(current: OrderStatus, target: OrderStatus): boolean {
    const allowed = this.transitions[current];
    return allowed ? allowed.includes(target) : false;
  }
}
