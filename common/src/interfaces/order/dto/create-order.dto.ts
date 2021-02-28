import { IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Total is not valid' })
  @Min(0, { message: 'Order total must better than 0' })
  total!: number;
}
