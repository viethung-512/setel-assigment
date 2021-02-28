import { IServiceResponse } from '../common/service-response.interface';
import { IOrderStatus } from './order.interface';

export interface IOrderCheckStatusRes extends IServiceResponse {
  data: IOrderStatus;
}
