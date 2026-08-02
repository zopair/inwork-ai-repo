import '../../../../core/result/result.dart';
import '../entities/order.dart';

abstract class OrderRepository {
  Future<Result<OrderEntity>> createOrder({
    required String customerId,
    required String serviceId,
    required String addressText,
  });

  Future<Result<OrderEntity>> acceptOrder(String orderId);
  Future<Result<OrderEntity>> startWork(String orderId);
  Future<Result<OrderEntity>> completeOrder(String orderId);
  Future<Result<OrderEntity>> rateOrder(String orderId, int rating);
}
