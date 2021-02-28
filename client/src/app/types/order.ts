import { IOrderStatus } from '@setel-practical-assignment/common';

export interface Order {
  id: string;
  total: number;
  status: IOrderStatus;
}
