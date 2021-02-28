import { PaymentModule } from './payment.module';
import { Test, TestingModule } from '@nestjs/testing';
import { IOrderStatus } from '../common/interfaces/order-status.interface';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'PAYMENT_SERVICE',
            transport: Transport.TCP,
            options: { host: '0.0.0.0', port: 3030 },
          },
        ]),
        PaymentModule,
      ],
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    paymentService = app.get<PaymentService>(PaymentService);
  });

  describe('Payment Service: randomOrderStatus', () => {
    it('Should return CANCELLED | CONFIRMED', () => {
      const status = paymentService.randomOrderStatus();

      const isValid = [IOrderStatus.CONFIRMED, IOrderStatus.CANCELLED].some(
        (stt) => stt === status,
      );

      expect(isValid).toEqual(true);
    });
  });
});
