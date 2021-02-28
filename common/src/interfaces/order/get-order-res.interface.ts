import { IServiceResponse } from '../common/service-response.interface';
import { IOrder } from './order.interface';

export interface IOrderGetRes extends IServiceResponse {
  data: IOrder | null;
}
