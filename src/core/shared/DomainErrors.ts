export enum ErrorCode {
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  UNAUTHORIZED = 'UNAUTHORIZED',
  STORAGE_CONFLICT = 'STORAGE_CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  IDEMPOTENCY_REPLAY = 'IDEMPOTENCY_REPLAY',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND'
}

export class DomainError extends Error {
  constructor(
    public code: ErrorCode, 
    message: string, 
    public correlationId?: string,
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'DomainError';
  }
}
