class Failure implements Exception {
  final String code;
  final String message;
  final bool retryable;

  const Failure({
    required this.code,
    required this.message,
    required this.retryable,
  });

  @override
  String toString() => 'Failure(code: $code, message: $message, retryable: $retryable)';
}

class OrderAlreadyAssignedFailure extends Failure {
  const OrderAlreadyAssignedFailure(String message)
      : super(code: 'ORDER_ALREADY_ASSIGNED', message: message, retryable: false);
}
