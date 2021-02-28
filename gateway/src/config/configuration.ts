import { Transport } from '@nestjs/microservices';

export default () => {
  const orderServiceHost =
    process.env.NODE_ENV === 'dev' ? '0.0.0.0' : process.env.ORDER_SERVICE_HOST;
  const paymentServiceHost =
    process.env.NODE_ENV === 'dev'
      ? '0.0.0.0'
      : process.env.PAYMENT_SERVICE_HOST;

  return {
    port: process.env.API_GATEWAY_PORT,
    orderService: {
      options: {
        port: process.env.ORDER_SERVICE_PORT,
        host: orderServiceHost,
      },
      transport: Transport.TCP,
    },
    paymentService: {
      options: {
        port: process.env.PAYMENT_SERVICE_PORT,
        host: paymentServiceHost,
      },
      transport: Transport.TCP,
    },
  };
};
