import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import configuration from './config/configuration';
import { AddAuthUserMiddleware } from './middleware/add-auth-user.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [OrderController, AuthController],
  providers: [
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        const orderServiceOptions = configuration().orderService as any;
        return ClientProxyFactory.create(orderServiceOptions);
      },
      inject: [],
    },
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: () => {
        const paymentServiceOptions = configuration().paymentService as any;
        return ClientProxyFactory.create(paymentServiceOptions);
      },
      inject: [],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddAuthUserMiddleware)
      .forRoutes('api/orders', '/api/me', '/api/logout')
      .apply(AuthMiddleware)
      .forRoutes('api/orders', 'api/me', 'api/logout');
  }
}
