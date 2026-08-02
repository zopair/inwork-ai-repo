abstract class Result<T> {
  const Result();

  R when<R>({
    required R Function(T data, String correlationId) success,
    required R Function(String code, String message, String correlationId) failure,
  });
}

class Success<T> extends Result<T> {
  final T data;
  final String correlationId;
  const Success(this.data, this.correlationId);

  @override
  R when<R>({
    required R Function(T data, String correlationId) success,
    required R Function(String code, String message, String correlationId) failure,
  }) {
    return success(data, correlationId);
  }
}

class Failure<T> extends Result<T> {
  final String code;
  final String message;
  final String correlationId;
  const Failure(this.code, this.message, this.correlationId);

  @override
  R when<R>({
    required R Function(T data, String correlationId) success,
    required R Function(String code, String message, String correlationId) failure,
  }) {
    return failure(code, message, correlationId);
  }
}
