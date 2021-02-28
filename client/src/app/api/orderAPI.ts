import axiosClient from './axiosClient';

import { Order } from '../types/order';
import { PaginationResponse } from '@setel-practical-assignment/common';

const getOrders = async (args: {
  page?: number;
  limit?: number;
}): Promise<PaginationResponse<Order>> => {
  return axiosClient.get('/orders', {
    params: {
      page: args.page,
      limit: args.limit,
    },
  });
};

const getOrder = async (id: string): Promise<Order> => {
  return axiosClient.get(`/orders/${id}`);
};

const createOrder = async (total: number): Promise<Order> => {
  return axiosClient.post('/orders', {
    total,
  });
};

const cancelledOrder = async (id: string): Promise<Order> => {
  return axiosClient.put(`/orders/cancelled/${id}`);
};

const checkOrderStatus = async (id: string): Promise<Order> => {
  return axiosClient.get(`/orders/status/${id}`);
};

const testOrder = async () => {
  return axiosClient.get('/orders/test');
};

const orderAPI = {
  getOrders,
  getOrder,
  createOrder,
  cancelledOrder,
  checkOrderStatus,
  testOrder,
};

export default orderAPI;
