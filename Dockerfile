FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "node","server.js" ]

EXPOSE 3004
