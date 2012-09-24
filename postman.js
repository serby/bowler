var request = require('request')
  , properties = require('./properties')
  , os = require('os')
  , pulseUrl = properties.mothershipUrl + '/pulse'
  , interval = 5000
  ;

function pulse() {
  request.post(pulseUrl,
    { body: JSON.stringify(os.networkInterfaces()) }, function(error, data) {
  });
}

pulse();
console.log('Setting up pulse to mothership: ' + pulseUrl + ' every ' +
  interval + 'ms');

setInterval(pulse, interval);