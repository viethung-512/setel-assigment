FROM node:alpine

RUN npm install -g npm@6.14.7
RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

# CMD [ "npm", "run", "start:dev" ]

RUN npm run build

CMD ["npm", "run", "start:prod"]
