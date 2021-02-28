import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './orders/order.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log(configuration().mongoDns);
        return {
          uri: configuration().mongoDns,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
