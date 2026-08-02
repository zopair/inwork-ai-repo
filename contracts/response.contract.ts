import { ErrorDTO } from './error.contract';

export interface ResponseEnvelope<T> {
  success: boolean;
  data?: T;
  error?: ErrorDTO;
  correlationId: string;
  timestamp: string;
}
