export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  correlationId: string;
  statusCode: number;
}

export class ErrorMapper {
  public static map(err: any, correlationId: string): ApiErrorResponse {
    let statusCode = 400;
    let code = 'INTERNAL_ERROR';
    let message = err.message || 'An unexpected error occurred';

    if (err.message.includes('UNAUTHORIZED')) {
      statusCode = 401;
      code = 'UNAUTHORIZED';
    } else if (err.message.includes('FORBIDDEN')) {
      statusCode = 403;
      code = 'FORBIDDEN';
    } else if (err.message.includes('NOT_FOUND') || err.message.includes('ORDER_NOT_FOUND')) {
      statusCode = 404;
      code = 'ORDER_NOT_FOUND';
    } else if (err.message.includes('INVALID')) {
      statusCode = 400;
      code = 'VALIDATION_ERROR';
    }

    return {
      success: false,
      error: { code, message },
      correlationId,
      statusCode
    };
  }
}
