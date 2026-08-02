export interface LogEvent {
  requestId: string;
  correlationId: string;
  route: string;
  method: string;
  durationMs: number;
  statusCode: number;
  timestamp: string;
}

export class ObservabilityLogger {
  private logs: LogEvent[] = [];

  public logRequest(event: LogEvent) {
    this.logs.push(event);
    // في بيئة الإنتاج الحقيقية يتم الطباعة بصيغة JSON Structured Logs
  }

  public getLogs(): LogEvent[] {
    return this.logs;
  }
}
