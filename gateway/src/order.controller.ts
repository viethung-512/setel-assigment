import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateOrderDto,
  IOrderCancelRes,
  IOrderCheckStatusRes,
  IOrderCreateRes,
  IOrderGetListRes,
  IOrderGetRes,
  IOrderStatus,
  IOrderUpdateRes,
  IPaymentHandleRes,
  MessageType,
  PaginationQuery,
} from '@setel-practical-assignment/common';

@Controller('api/orders')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderSrvClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentSrvClient: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    await this.orderSrvClient.connect();
  }
  @Post()
  async createOrder(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Req() req: any,
  ): Promise<IOrderCreateRes> {
    const newOrder = {
      total: createOrderDto.total,
      userId: req.user.id,
      status: IOrderStatus.CREATED,
    };
    const orderCreateRes: IOrderCreateRes = await this.orderSrvClient
      .send(MessageType.ORDER_CREATE, newOrder)
      .toPromise();
    const handlePaymentRes: IPaymentHandleRes = await this.paymentSrvClient
      .send(MessageType.PAYMENT_HANDLE, orderCreateRes.data)
      .toPromise();
    const orderUpdateRes: IOrderUpdateRes = await this.orderSrvClient
      .send(MessageType.ORDER_UPDATE, handlePaymentRes.data)
      .toPromise();

    setTimeout(async () => {
      const deliveredOrder = {
        ...orderUpdateRes.data,
        status: IOrderStatus.DELIVERED,
      };
      await this.orderSrvClient
        .send(MessageType.ORDER_UPDATE, deliveredOrder)
        .toPromise();
    }, 10000);
    return {
      status: orderCreateRes.status,
      errors: orderCreateRes.errors,
      data: orderUpdateRes.data,
      message: orderCreateRes.message,
    };
  }
  @Put('/:id/cancel')
  async cancelledOrder(@Param('id') id: string): Promise<IOrderCancelRes> {
    const orderCancelRes: IOrderCancelRes = await this.orderSrvClient
      .send(MessageType.ORDER_CANCEL, { orderId: id })
      .toPromise();
    return {
      status: orderCancelRes.status,
      errors: orderCancelRes.errors,
      data: orderCancelRes.data,
      message: orderCancelRes.message,
    };
  }
  @Get('/:id')
  async getOrder(@Param('id') id: string): Promise<IOrderGetRes> {
    const orderGetRes: IOrderGetRes = await this.orderSrvClient
      .send(MessageType.ORDER_GET_BY_ID, { orderId: id })
      .toPromise();
    return {
      status: orderGetRes.status,
      errors: orderGetRes.errors,
      data: orderGetRes.data,
      message: orderGetRes.message,
    };
  }
  @Get()
  async getOrderList(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<IOrderGetListRes> {
    const page =
      paginationQuery.page && typeof paginationQuery.page === 'string'
        ? parseInt(paginationQuery.page)
        : undefined;
    const limit =
      paginationQuery.limit && typeof paginationQuery.limit === 'string'
        ? parseInt(paginationQuery.limit)
        : undefined;
    const orderGetListRes: IOrderGetListRes = await this.orderSrvClient
      .send(MessageType.ORDER_GET_LIST, { page, limit })
      .toPromise();
    return {
      status: orderGetListRes.status,
      errors: orderGetListRes.errors,
      data: orderGetListRes.data,
      message: orderGetListRes.message,
    };
  }
  @Get('/:id/status')
  async checkOrderStatus(
    @Param('id') id: string,
  ): Promise<IOrderCheckStatusRes> {
    const orderCheckStatusRes: IOrderCheckStatusRes = await this.orderSrvClient
      .send(MessageType.ORDER_CHECK_STATUS, { orderId: id })
      .toPromise();
    return {
      status: orderCheckStatusRes.status,
      errors: orderCheckStatusRes.errors,
      data: orderCheckStatusRes.data,
      message: orderCheckStatusRes.message,
    };
  }
}
