var Faye = require('faye');

var client = new Faye.Client('http://192.168.99.100:8080/ws');

client.publish('/messages', {text: 'Hello world'});
