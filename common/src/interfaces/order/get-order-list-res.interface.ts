import { PaginationResponse } from '../common/pagination-response.interface';
import { IServiceResponse } from '../common/service-response.interface';
import { IOrder } from './order.interface';

interface PaginatedOrder extends PaginationResponse<IOrder> {}

export interface IOrderGetListRes extends IServiceResponse {
  data: PaginatedOrder;
}
