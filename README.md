# Setel Practical Assignment

Microservice with NestJS backend and React frontend.

## Usage

This app already dockerized, you can take it and deploy anywhere.

```bash
docker-compose up --build
```

Then, client app can use at port: `http://localhost:9000`

Note: This app also include Swagger module in the url: `http://localhost:${API_GATEWAY_PORT}/api`

## How to run in development

You can can clone this app to your local marchine and run it as local development.

Please follow these steps

```bash
git clone https://github.com/Sotatek-HungNgo3/setel-practical-assignment.git setel-pratical-assignment

cd setel-pratical-assignment

cd ./orders && npm i
cd ../client && npm i
cd ../payments && npm i
cd ../gateway && npm i

cd ../orders && npm run start:dev
cd ../payments && npm run start: dev
cd ../client && npm start
cd ../gateway && npm run start:dev
```

Note: This app need envinronment variables. So please add your `.env` file base on `.env.example` file that I have already attach.

## Testing

This application also tested, you can run the test to see the result.

## Test for Order service

```bash
cd ../orders
npm run test
```

## Test for Payment service

```bash
cd ../payments
npm run test
```

## Technology

Here is all the tech I have use in this project:

- Frontend: [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- Backend: [NestJS](https://nestjs.com/) + Database [Mongodb](https://www.mongodb.com/)
- Lib CSS: [Material UI](https://material-ui.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
