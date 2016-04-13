const Http = require('http'),
      Faye = require('faye'),
      config = require('./config');

// http://blog.csdn.net/shiqiang1234/article/details/5402879

var bayeux = new Faye.NodeAdapter({
  mount: '/ws',
  timeout: 45,
  ping: 30
});

// Handle non-Bayeux requests
var server = Http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, non-Bayeux request');
});

bayeux.on('handshake', function(client_id) {
  console.info("[handshake] client_id: " + client_id);
});

bayeux.on('disconnect', function(client_id) {
  console.info("[disconnect] client_id: " + client_id);
});

bayeux.on('subscribe', function(client_id, channel) {
  console.info("[subscribe] client_id: " + client_id + ", channel: " + channel);
});

bayeux.on('unsubscribe', function(client_id, channel) {
  console.info("[unsubscribe] client_id: " + client_id + ", channel: " + channel);
});

bayeux.on('publish', function(client_id, channel, data) {
  console.info("[publish] client_id: " + client_id + ", channel: " + channel + ", data: " + JSON.stringify(data));
});

bayeux.attach(server);
server.listen(config.port);

console.info("Websocket Server started at http://0.0.0.0:" + config.port);
