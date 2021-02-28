import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import {
  IOrderCancelRes,
  IOrderCheckStatusRes,
  IOrderCreateRes,
  IOrderGetListRes,
  IOrderGetRes,
  IOrderUpdateRes,
  MessageType,
} from '@setel-practical-assignment/common';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(MessageType.ORDER_CREATE)
  async createOrder(data: any): Promise<IOrderCreateRes> {
    try {
      const newOrder = await this.orderService.createOrder(data);

      return {
        status: HttpStatus.CREATED,
        message: 'order_create_success',
        data: newOrder,
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'order_create_error',
        data: null,
        errors: { message: 'Can not create order' },
      };
    }
  }

  @MessagePattern(MessageType.ORDER_UPDATE)
  async updateOrder(data: any): Promise<IOrderUpdateRes> {
    try {
      const updatedOrder = await this.orderService.updateOrder(data.id, data);

      return {
        status: HttpStatus.OK,
        message: 'order_update_success',
        data: updatedOrder,
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'order_update_error',
        data: null,
        errors: { message: 'Can not update Order' },
      };
    }
  }

  @MessagePattern(MessageType.ORDER_CANCEL)
  async cancelOrder(data: any): Promise<IOrderCancelRes> {
    try {
      const cancelledOrder = await this.orderService.cancelledOrder(
        data.orderId,
      );

      return {
        status: HttpStatus.OK,
        message: 'order_cancel_success',
        data: cancelledOrder,
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'order_cancel_error',
        data: null,
        errors: { message: 'Order Not Found' },
      };
    }
  }

  @MessagePattern(MessageType.ORDER_CHECK_STATUS)
  async checkOrderStatus(data: any): Promise<IOrderCheckStatusRes> {
    try {
      const orderStatus = await this.orderService.checkOrderStatus(
        data.orderId,
      );

      return {
        status: HttpStatus.OK,
        message: 'order_check_status_success',
        data: orderStatus,
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'order_check_status_error',
        data: null,
        errors: { message: 'Order Not Found' },
      };
    }
  }

  @MessagePattern(MessageType.ORDER_GET_LIST)
  async getOrderList(data: any): Promise<IOrderGetListRes> {
    try {
      const paginated = await this.orderService.getListOrder({
        page: data.page,
        limit: data.limit,
      });

      return {
        status: HttpStatus.OK,
        message: 'order_get_list_success',
        data: {
          docs: paginated.docs,
          totalDocs: paginated.totalDocs,
          totalPages: paginated.totalPages,
          page: paginated.page,
          limit: paginated.limit,
        },
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'order_get_list_error',
        data: null,
        errors: { message: 'Something went wrong, please try again' },
      };
    }
  }

  @MessagePattern(MessageType.ORDER_GET_BY_ID)
  async getOrder(data: any): Promise<IOrderGetRes> {
    try {
      const order = await this.orderService.getOrder(data.orderId);

      return {
        status: HttpStatus.OK,
        message: 'order_get_by_id_success',
        data: order,
        errors: null,
      };
    } catch (err) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'order_get_by_id_error',
        data: null,
        errors: { message: 'Order not found' },
      };
    }
  }
}
