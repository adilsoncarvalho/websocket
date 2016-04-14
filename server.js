const Http = require('http'),
      Faye = require('faye'),
      Router = require('node-simple-router'),
      config = require('./config');

// http://blog.csdn.net/shiqiang1234/article/details/5402879

var bayeux = new Faye.NodeAdapter({
  mount: '/ws',
  timeout: 45,
  ping: 30
});

var ws;

routes = new Router();

// Request dealers :)

function badRequest(res, error){
  str = JSON.stringify({ error: error }, null, 0);
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(str);
  console.log(str);
}

function okRequest(res, body){
  str = JSON.stringify(body, null, 0);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(str);
  console.log(str);
}

function log(type, payload){
  console.log(JSON.stringify({ type: type, sent_at: new Date(), payload: payload }, null, 0));
}

function syncMessage(req, res){
  payload = req.body;
  errors = [];

  if(!payload.channel) errors.push('missing channel attribute');
  if(!payload.message) errors.push('missing message attribute');
  if(errors.length > 0) {
    errors.push({ payload: payload });
    return badRequest(res, errors);
  }

  channel = ('/' + payload.channel).replace(/\/{2}/g, '/');

  ws.publish('/messages' + channel, { message: payload.message });
  okRequest(res, { type: 'request', timestamp: new Date(), body: payload });
}

// Routes

routes.get('/', function(req, res){
  okRequest(res, {});
});

routes.post('/messages', function(req, res){
  syncMessage(req, res);
});

// Handle non-Bayeux requests
var server = Http.createServer(routes);

bayeux.on('handshake', function(client_id) {
  log('handshake', { client_id: client_id });
});

bayeux.on('disconnect', function(client_id) {
  log('disconnect', { client_id: client_id });
});

bayeux.on('subscribe', function(client_id, channel) {
  log('handshake', { client_id: client_id, channel: channel });
});

bayeux.on('unsubscribe', function(client_id, channel) {
  log('unsubscribe', { client_id: client_id, channel: channel })
});

bayeux.on('publish', function(client_id, channel, payload) {
  log('publish', { client_id: client_id, channel: channel, payload: payload });
});

bayeux.attach(server);
server.listen(config.port);

var ws = new Faye.Client(config.serverUri(), [])


log("info", { text: "Websocket Server started at http://0.0.0.0:" + config.port });
