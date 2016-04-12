var WebSockets = require('faye-websocket');

var ws = new WebSockets.Client('ws://192.168.99.100:8080/ws');

ws.on('message', function(event) {
  console.info('Got a message: ' + event.message);
});
