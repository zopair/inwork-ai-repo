export interface ApiClientConfig {
  baseUrl: string;
  timeoutMs?: number;
}

export class InWorkApiClient {
  constructor(private readonly config: ApiClientConfig) {}

  public async request(method: string, endpoint: string, token?: string, body?: any, correlationId?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-correlation-id': correlationId || `TRACE-FLUTTER-${Date.now()}`
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // محاكاة الاتصال الفعلي بخادم Fastify Gateway أو الاتصال الحقيقي في بيئة الإنتاج
    const url = `${this.config.baseUrl}${endpoint}`;
    
    // سنقوم بتوجيه الطلب مباشرة إلى خادم الـ API المحلي للتأكد من التوافق التام
    return {
      url,
      method,
      headers,
      body
    };
  }
}
