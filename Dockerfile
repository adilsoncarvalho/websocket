FROM node:0.12-slim

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install faye

ENV SERVER_PORT 8080

EXPOSE 8080

CMD node server.js
