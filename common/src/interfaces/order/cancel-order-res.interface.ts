import { IServiceResponse } from '../common/service-response.interface';
import { IOrder } from './order.interface';

export interface IOrderCancelRes extends IServiceResponse {
  data: IOrder | null;
}
