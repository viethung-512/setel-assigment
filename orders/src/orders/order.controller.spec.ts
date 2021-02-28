import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { OrderModule } from './order.module';
import {
  IOrderStatus,
  PaginationQuery,
} from '@setel-practical-assignment/common';

let mongo: any;

describe('AppController', () => {
  let orderController: OrderController;

  beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    const mongoUri = await mongo.getUri();

    for (const collection of collections) {
      await collection.deleteMany({});
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: 'Order',
            schema: OrderSchema,
          },
        ]),
        ClientsModule.register([
          {
            name: 'ORDER_SERVICE',
            transport: Transport.TCP,
            options: { host: '0.0.0.0', port: 4040 },
          },
        ]),
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongoUri,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
        }),
        AuthModule,
        OrderModule,
      ],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });

  describe('Order: cancelled', () => {
    it('Should return the cancelled order with valid id', async () => {
      const userId = '123fdaoifhioaf';
      const total = 123;
      const status = IOrderStatus.CREATED;

      const order = await orderController.createOrder({
        total,
        userId,
        status,
      });

      const cancelledOrder = await orderController.cancelOrder({
        orderId: order.data.id,
      });

      expect(cancelledOrder.data.id).toEqual(order.data.id);
      expect(cancelledOrder.data.status).toEqual(IOrderStatus.CANCELLED);
    });
  });

  describe('Order: get list', () => {
    it('Should return the paginated order with valid id', async () => {
      const userId = '123fdaoifhioaf';
      const total = 123;
      const status = IOrderStatus.CREATED;

      await orderController.createOrder({
        total,
        userId,
        status,
      });
      await orderController.createOrder({
        total,
        userId,
        status,
      });
      await orderController.createOrder({
        total,
        userId,
        status,
      });

      const query: PaginationQuery = {
        page: 1,
        limit: 10,
      };

      const paginatedOrder = await orderController.getOrderList(query);

      expect(paginatedOrder.data.limit).toEqual(query.limit);
      expect(paginatedOrder.data.page).toEqual(query.page);
      expect(paginatedOrder.data.totalDocs).toEqual(3);
      expect(paginatedOrder.data.totalPages).toEqual(1);
    });
  });

  describe('Order get item', () => {
    it('Should return the order with valid id', async () => {
      const userId = '123fdaoifhioaf';
      const total = 123;
      const status = IOrderStatus.CREATED;

      const newOrderRes = await orderController.createOrder({
        total,
        userId,
        status,
      });

      const orderRes = await orderController.getOrder({
        orderId: newOrderRes.data._id,
      });

      expect(orderRes.data.id).toEqual(newOrderRes.data.id);
      expect(orderRes.data.total).toEqual(newOrderRes.data.total);
    });
  });

  describe('Order check status', () => {
    it('Should return the order status with valid id', async () => {
      const userId = '123fdaoifhioaf';
      const total = 123;
      const status = IOrderStatus.CREATED;

      const newOrder = await orderController.createOrder({
        total,
        userId,
        status,
      });

      const orderStatusRes = await orderController.checkOrderStatus({
        orderId: newOrder.data.id,
      });
      console.log(orderStatusRes);
      const isStatusValid = Object.values(IOrderStatus).some(
        (stt) => stt === orderStatusRes.data,
      );

      expect(isStatusValid).toEqual(true);
    });
  });

  describe('Order: Create', () => {
    it('Should return the order with valid id', async () => {
      const userId = '123fdaoifhioaf';
      const total = 123;
      const status = IOrderStatus.CREATED;

      const order = await orderController.createOrder({
        total,
        userId,
        status,
      });

      expect(order.data).toHaveProperty('_id');
      expect(order.data.total).toEqual(total);
      expect(order.data.userId).toEqual(userId);
      expect(order.data.status).toEqual(status);
    });
  });
});
