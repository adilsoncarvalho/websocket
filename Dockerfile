FROM node:0.12-slim

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install faye faye-websocket underscore

ENV SERVER_BINDING 0.0.0.0
ENV SERVER_ADDR 192.168.99.100
ENV SERVER_PORT 8080
ENV SERVER_ENDPOINT ws

EXPOSE 8080

CMD node server.js
