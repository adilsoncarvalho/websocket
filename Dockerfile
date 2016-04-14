FROM node:0.12-slim

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install

ENV SERVER_BINDING 0.0.0.0
ENV SERVER_ADDR 127.0.0.1
ENV SERVER_PORT 80
ENV SERVER_ENDPOINT ws

EXPOSE 8080

CMD node server.js
