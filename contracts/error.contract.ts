export type ErrorCodeType =
  | "INVALID_STATE_TRANSITION"
  | "UNAUTHORIZED"
  | "STORAGE_CONFLICT"
  | "RATE_LIMIT_EXCEEDED"
  | "IDEMPOTENCY_REPLAY"
  | "VALIDATION_ERROR";

export interface ErrorDTO {
  code: ErrorCodeType;
  message: string;
  retryable: boolean;
}
