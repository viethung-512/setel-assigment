import { IsOptional } from 'class-validator';
import { IOrderStatus } from '../order.interface';

export class UpdateOrderDto {
  @IsOptional()
  total?: number;

  @IsOptional()
  userId?: string;

  @IsOptional()
  status?: IOrderStatus;
}
