import { HttpStatus } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IPaymentHandleRes,
  MessageType,
} from '@setel-practical-assignment/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(MessageType.PAYMENT_HANDLE)
  async createdOrder(data: any): Promise<IPaymentHandleRes> {
    const randomOrderStatus = this.paymentService.randomOrderStatus();

    data.status = randomOrderStatus;

    return {
      status: HttpStatus.OK,
      errors: null,
      message: 'payment_handle_success',
      data: data,
    };
  }
}
