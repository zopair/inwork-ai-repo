export type PilotEventType = 
  | 'ORDER_CREATED' 
  | 'WORKER_ACCEPTED' 
  | 'ORDER_COMPLETED' 
  | 'USER_RATED' 
  | 'AUTH_FAILED';

export interface PilotEvent {
  eventId: string;
  timestamp: string;
  userId?: string;
  orderId?: string;
  correlationId: string;
  eventType: PilotEventType;
  metadata?: Record<string, any>;
}

export interface BusinessMetrics {
  registeredUsers: number;
  activeCustomers: number;
  activeWorkers: number;
  ordersCreated: number;
  ordersCompleted: number;
}

export interface TechnicalMetrics {
  averageResponseTimeMs: number;
  errorRatePercent: number;
  storageConflicts: number;
  authFailures: number;
}

export class PilotTelemetryManager {
  private events: PilotEvent[] = [];
  private businessMetrics: BusinessMetrics = {
    registeredUsers: 150,
    activeCustomers: 120,
    activeWorkers: 30,
    ordersCreated: 45,
    ordersCompleted: 40
  };
  private technicalMetrics: TechnicalMetrics = {
    averageResponseTimeMs: 42,
    errorRatePercent: 0.5,
    storageConflicts: 0,
    authFailures: 2
  };

  public recordEvent(event: Omit<PilotEvent, 'eventId' | 'timestamp'>) {
    const fullEvent: PilotEvent = {
      ...event,
      eventId: `evt-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    this.events.push(fullEvent);
  }

  public getEvents(): PilotEvent[] {
    return this.events;
  }

  public getDashboardMetrics() {
    return {
      business: this.businessMetrics,
      technical: this.technicalMetrics,
      totalEventsLogged: this.events.length
    };
  }
}
