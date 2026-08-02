class ErrorDTO {
  final String code;
  final String message;
  final bool retryable;

  const ErrorDTO({
    required this.code,
    required this.message,
    required this.retryable,
  });

  factory ErrorDTO.fromJson(Map<String, dynamic> json) {
    return ErrorDTO(
      code: json['code'] ?? 'UNKNOWN_ERROR',
      message: json['message'] ?? 'An error occurred',
      retryable: json['retryable'] ?? false,
    );
  }
}

class ResponseEnvelope<T> {
  final bool success;
  final T? data;
  final ErrorDTO? error;
  final String correlationId;
  final String timestamp;

  const ResponseEnvelope({
    required this.success,
    this.data,
    this.error,
    required this.correlationId,
    required this.timestamp,
  });

  factory ResponseEnvelope.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) {
    return ResponseEnvelope(
      success: json['success'] ?? false,
      data: json['data'] != null ? fromJsonT(json['data']) : null,
      error: json['error'] != null ? ErrorDTO.fromJson(json['error']) : null,
      correlationId: json['correlationId'] ?? '',
      timestamp: json['timestamp'] ?? '',
    );
  }
}
