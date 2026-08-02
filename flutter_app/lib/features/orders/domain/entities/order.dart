class OrderEntity {
  final String id;
  final String customerId;
  final String? workerId;
  final String serviceId;
  final String addressText;
  final String status;
  final String createdAt;
  final String updatedAt;

  const OrderEntity({
    required this.id,
    required this.customerId,
    this.workerId,
    required this.serviceId,
    required this.addressText,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });
}
