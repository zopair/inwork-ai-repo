import '../entities/order.dart';

abstract class OrderRepository {
  Future<Order> createOrder({
    required String customerId,
    required String serviceId,
    required String addressText,
  });

  Future<Order> acceptOrder(String orderId);
  Future<Order> getOrder(String orderId);
}
