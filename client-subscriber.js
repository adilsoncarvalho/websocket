var Faye = require('faye');

var client = new Faye.Client('http://192.168.99.100:8080/ws');

client.subscribe('/messages', function(message) {
  console.info('Got a message: ' + message.text);
});
