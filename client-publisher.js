var WebSocket = require('faye-websocket'),
    config = require('./config');

var ws = new WebSocket.Client(config.serverUri(), [])

ws.send('TESTE');
