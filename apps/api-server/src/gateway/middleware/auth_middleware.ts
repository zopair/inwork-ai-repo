import { AuthService } from '@core/features/identity/services/auth_service';
import { UserRole } from '@core/features/identity/domain/User';

export interface AuthenticatedRequest {
  headers: {
    authorization?: string;
    'x-correlation-id'?: string;
  };
  user?: {
    userId: string;
    role: UserRole;
  };
  correlationId?: string;
}

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}

  public handle(req: AuthenticatedRequest, requiredRole?: UserRole) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('UNAUTHORIZED_MISSING_TOKEN');
    }

    const token = authHeader.replace('Bearer ', '');
    const claims = this.authService.validateToken(token);

    if (requiredRole && claims.role !== requiredRole && claims.role !== UserRole.ADMIN) {
      throw new Error('FORBIDDEN_INSUFFICIENT_PERMISSIONS');
    }

    req.user = {
      userId: claims.userId,
      role: claims.role
    };

    req.correlationId = req.headers['x-correlation-id'] || `TRACE-HTTP-${Date.now()}`;
  }
}
