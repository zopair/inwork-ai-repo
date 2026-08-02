import { describe, it, expect } from 'vitest';
import { InWorkStorageEngine, InMemoryStorageProvider } from '@inwork/storage-engine';
import { OrderRepository } from '../features/orders/infrastructure/OrderRepository';
import { CreateOrderUseCase } from '../features/orders/application/use-cases/CreateOrderUseCase';
import { ResponseEnvelope, OrderDTO } from '../../contracts';

describe('Gate 7.1: API Gateway & Envelope Transport Integration', () => {
  it('should process HTTP-like request payload through gateway envelope pattern', async () => {
    const provider = new InMemoryStorageProvider();
    const engine = new InWorkStorageEngine(provider);
    const repository = new OrderRepository(engine);
    const clock = { now: () => new Date().toISOString() };
    const idGen = { generate: () => 'GATEWAY-ORD-001' };

    const createOrder = new CreateOrderUseCase(repository, clock, idGen);
    
    // محاكاة محطة استقبال الطلبات في الـ API Gateway
    const handleCreateOrderRequest = async (body: any, correlationId: string): Promise<ResponseEnvelope<OrderDTO>> => {
      try {
        const orderId = await createOrder.execute({
          customerId: body.customerId,
          serviceId: body.serviceId,
          addressText: body.addressText
        });

        const savedOrder = await repository.findById(orderId);
        const props = savedOrder!.getProps();

        const orderDto: OrderDTO = {
          id: props.id,
          customerId: props.customerId,
          workerId: props.workerId,
          serviceId: props.serviceId,
          addressText: props.addressText,
          status: props.status as any,
          createdAt: props.createdAt,
          updatedAt: props.updatedAt
        };

        return {
          success: true,
          data: orderDto,
          correlationId,
          timestamp: new Date().toISOString()
        };
      } catch (err: any) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: err.message,
            retryable: false
          },
          correlationId,
          timestamp: new Date().toISOString()
        };
      }
    };

    // تنفيذ طلب تجريبي عبر محاكاة الـ Gateway
    const response = await handleCreateOrderRequest({
      customerId: 'cust-gateway-1',
      serviceId: 'plumbing',
      addressText: 'Ismailia Sector 4'
    }, 'TRACE-GATEWAY-123');

    expect(response.success).toBe(true);
    expect(response.correlationId).toBe('TRACE-GATEWAY-123');
    expect(response.data?.id).toBe('GATEWAY-ORD-001');
    expect(response.data?.status).toBe('Pending'); // Domain status mapped or checked
  });
});
