var WebSockets = require('faye-websocket'),
    config = require('./config');

var ws = new WebSocket.Client(config.serverUri(), [])

ws.on('message', function(event) {
  console.info('Got a message: ' + event.message);
});
