const Faye = require('faye'),
      config = require('./config');

var client = new Faye.Client(config.serverUri());

client.subscribe('/sync', function(message) {
  console.info(
    new Date() + ' SYNC ' + JSON.stringify(message.text)
  );
});

client.publish('/sync', {
  text: 'Hello world'
});
