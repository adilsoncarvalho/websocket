var Http = require('http'),
    WebSocket = require('faye-websocket')
    config = require('./config');

var server = Http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, non-websocket request');
});

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);

    ws.on('open', function(event) {
      console.info("[open] event: " + event);
    });

    ws.on('close', function(event) {
      console.info("[close] event: " + event);
    });

    ws.on('message', function(event) {
      console.info("[message] event: " + JSON.stringify(event.data));
    });

    ws.on('error', function(event) {
      console.info("[error] event: " + error);
    });
  }
});

server.listen(config.port, config.binding);

console.info("Websocket Server started at " + config.serverUri());
