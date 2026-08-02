import { OrderStatus, OrderStateMachine } from './OrderStatus';

export interface OrderProps {
  id: string;
  customerId: string;
  workerId?: string;
  serviceId: string;
  status: OrderStatus;
  addressText: string;
  timeline: { status: OrderStatus; timestamp: string }[];
  attachments: string[];
  payment?: { amount: number; method: string; paidAt: string };
  rating?: { score: number; comment?: string };
  createdAt: string;
}

export class OrderAggregate {
  public getId(): string {
    return this.props.id;
  }
  private constructor(private props: OrderProps) {}

  public static create(props: Omit<OrderProps, 'status' | 'timeline' | 'attachments'>, now: string): OrderAggregate {
    return new OrderAggregate({
      ...props,
      status: OrderStatus.Pending,
      timeline: [{ status: OrderStatus.Pending, timestamp: now }],
      attachments: [],
      createdAt: now,
    });
  }

  public static reconstitute(props: OrderProps): OrderAggregate {
    return new OrderAggregate(props);
  }

  private changeStatus(newStatus: OrderStatus, now: string): void {
    if (!OrderStateMachine.canTransition(this.props.status, newStatus)) {
      throw new Error(`Invalid state transition from ${this.props.status} to ${newStatus}`);
    }
    this.props.status = newStatus;
    this.props.timeline.push({ status: newStatus, timestamp: now });
  }

  public assignWorker(workerId: string, now: string): void {
    this.changeStatus(OrderStatus.Assigned, now);
    this.props.workerId = workerId;
  }

  public acceptOrder(now: string): void {
    this.changeStatus(OrderStatus.Accepted, now);
  }

  public startOrder(now: string): void {
    this.changeStatus(OrderStatus.InProgress, now);
  }

  public addAttachment(url: string): void {
    this.props.attachments.push(url);
  }

  public completeOrder(payment: { amount: number; method: string }, now: string): void {
    this.changeStatus(OrderStatus.Completed, now);
    this.props.payment = { ...payment, paidAt: now };
  }

  public rateOrder(score: number, comment?: string): void {
    if (this.props.status !== OrderStatus.Completed) {
      throw new Error("Cannot rate an order that is not completed.");
    }
    this.props.rating = { score, comment };
  }

  public getProps(): OrderProps {
    return { ...this.props };
  }
}
