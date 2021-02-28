import { Injectable } from '@nestjs/common';
import { IOrderStatus } from '@setel-practical-assignment/common';

@Injectable()
export class PaymentService {
  randomOrderStatus(): IOrderStatus {
    const arr = [IOrderStatus.CONFIRMED, IOrderStatus.CANCELLED];

    return arr[Math.floor(Math.random() * arr.length)];
  }
}
