import { AuthService } from '@core/features/identity/services/auth_service';
import { AuthMiddleware, AuthenticatedRequest } from './gateway/middleware/auth_middleware';
import { UserRole } from '@core/features/identity/domain/User';
import { ConfigManager } from './config/runtime.config';
import { ObservabilityLogger } from './infrastructure/observability/logger';
import { ErrorMapper } from './infrastructure/errors/error_mapper';

export class ApiServerApp {
  private authService = new AuthService();
  private authMiddleware = new AuthMiddleware(this.authService);
  private config = ConfigManager.load();
  private logger = new ObservabilityLogger();

  public async handleRequest(method: string, path: string, headers: any, body?: any) {
    const startTime = Date.now();
    const correlationId = headers['x-correlation-id'] || `TRACE-OPS-${Date.now()}`;
    const requestId = `req-${Math.floor(Math.random() * 100000)}`;

    try {
      let responseData: any;

      // 1. Health Endpoints
      if (method === 'GET' && path === '/health') {
        responseData = { status: 'healthy', service: 'inwork-api', version: '0.2.0-mvp', timestamp: new Date().toISOString() };
      } 
      else if (method === 'GET' && path === '/ready') {
        responseData = { status: 'ready', mode: this.config.env, uptime: process.uptime() };
      }
      // 2. Auth Endpoints
      else if (method === 'POST' && path === '/api/v1/auth/otp-request') {
        responseData = this.authService.requestOtp(body.phoneNumber);
      }
      else if (method === 'POST' && path === '/api/v1/auth/otp-verify') {
        responseData = this.authService.verifyOtp(body.phoneNumber, body.otpCode, body.role || UserRole.CUSTOMER);
      }
      // 3. Admin Protected Endpoint
      else if (method === 'GET' && path === '/api/v1/admin/metrics') {
        const req: AuthenticatedRequest = { headers, correlationId };
        this.authMiddleware.handle(req, UserRole.ADMIN);
        responseData = { systemStatus: 'HEALTHY', activeOrders: 42, environment: this.config.env };
      }
      else {
        throw new Error('NOT_FOUND: Route not found');
      }

      const durationMs = Date.now() - startTime;
      this.logger.logRequest({
        requestId,
        correlationId,
        route: path,
        method,
        durationMs,
        statusCode: 200,
        timestamp: new Date().toISOString()
      });

      return { success: true, data: responseData, correlationId };

    } catch (err: any) {
      const durationMs = Date.now() - startTime;
      const errorMapped = ErrorMapper.map(err, correlationId);

      this.logger.logRequest({
        requestId,
        correlationId,
        route: path,
        method,
        durationMs,
        statusCode: errorMapped.statusCode,
        timestamp: new Date().toISOString()
      });

      return errorMapped;
    }
  }

  public getLogger() {
    return this.logger;
  }
}
