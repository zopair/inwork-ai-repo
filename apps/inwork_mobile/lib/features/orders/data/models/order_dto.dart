import '../../domain/entities/order.dart';

class OrderDTO {
  final String id;
  final String customerId;
  final String? workerId;
  final String serviceId;
  final String addressText;
  final String status;
  final String createdAt;
  final String updatedAt;

  const OrderDTO({
    required this.id,
    required this.customerId,
    this.workerId,
    required this.serviceId,
    required this.addressText,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });

  factory OrderDTO.fromJson(Map<String, dynamic> json) {
    return OrderDTO(
      id: json['id'],
      customerId: json['customerId'],
      workerId: json['workerId'],
      serviceId: json['serviceId'],
      addressText: json['addressText'],
      status: json['status'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }

  Order toEntity() {
    return Order(
      id: id,
      customerId: customerId,
      workerId: workerId,
      serviceId: serviceId,
      addressText: addressText,
      status: status,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }
}
