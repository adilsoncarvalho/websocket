/*var WebSockets = require('faye'),
    config = require('./config');

var ws = new WebSocket.Client(config.serverUri(), [])

ws.on('message', function(event) {
  console.info('Got a message: ' + event.message);
});
*/

var Faye = require('faye');
var client = new Faye.Client('https://sync-bda.appspot.com/ws');

// client.subscribe('/messages', function(message) {
//   console.info('Got a message: ' + JSON.stringify(message));
// });

client.subscribe('/messages/blibli', function(message) {
  console.info('Got a message: ' + JSON.stringify(message));
});
