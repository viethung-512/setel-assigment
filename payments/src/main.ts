import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const logger = new Logger('Payment');

  const { port } = configuration();

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  });
  await app.listenAsync();
  logger.log(`Listening on port ${port}`);
}
bootstrap();
