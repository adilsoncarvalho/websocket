var WebSocket = require('faye-websocket');

var ws = new WebSocket.Client('ws://192.168.99.100:8080/ws', [])

ws.send('TESTE');
