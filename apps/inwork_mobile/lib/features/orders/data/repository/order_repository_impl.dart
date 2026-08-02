import '../../domain/entities/order.dart';
import '../../domain/repositories/order_repository.dart';
import '../models/order_dto.dart';
import '../../../../core/contracts/response_envelope.dart';
import '../../../../core/errors/failure.dart';

class OrderRepositoryImpl implements OrderRepository {
  // محاكاة لـ API Client أو Remote DataSource
  final Future<ResponseEnvelope<Map<String, dynamic>>> Function(String endpoint, Map<String, dynamic> body) apiClientMock;

  OrderRepositoryImpl({required this.apiClientMock});

  @override
  Future<Order> createOrder({
    required String customerId,
    required String serviceId,
    required String addressText,
  }) async {
    final response = await apiClientMock('/orders', {
      'customerId': customerId,
      'serviceId': serviceId,
      'addressText': addressText,
    });

    if (!response.success || response.data == null) {
      final errCode = response.error?.code ?? 'UNKNOWN_ERROR';
      if (errCode == 'ORDER_ALREADY_ASSIGNED') {
        throw OrderAlreadyAssignedFailure(response.error?.message ?? 'Order already assigned');
      }
      throw Failure(
        code: errCode,
        message: response.error?.message ?? 'Failed to create order',
        retryable: response.error?.retryable ?? false,
      );
    }

    return OrderDTO.fromJson(response.data!).toEntity();
  }

  @override
  Future<Order> acceptOrder(String orderId) async {
    final response = await apiClientMock('/orders/$orderId/accept', {});
    
    if (!response.success || response.data == null) {
      throw Failure(
        code: response.error?.code ?? 'UNKNOWN_ERROR',
        message: response.error?.message ?? 'Failed to accept order',
        retryable: response.error?.retryable ?? false,
      );
    }

    return OrderDTO.fromJson(response.data!).toEntity();
  }

  @override
  Future<Order> getOrder(String orderId) async {
    // Stub for fetching order
    throw UnimplementedError();
  }
}
