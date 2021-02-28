export default () => {
  return {
    port: parseInt(process.env.ORDER_SERVICE_PORT),
    baseUri: process.env.BASE_URI,
    gatewayPort: process.env.API_GATEWAY_PORT,
    mongoDns: process.env.MONGO_DSN,
  };
};
