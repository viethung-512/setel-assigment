import { Document } from 'mongoose';

export enum IOrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export interface IOrder extends Document {
  userId: string;
  total: number;
  status: IOrderStatus;
}
