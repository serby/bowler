var os = require('os')
  , request = require('request')
  , properties = require('./properties')
  ;

function pulse() {
  request(properties.mothershipUrl + '/pulse', function(error) {
    // Ignore Error
  });
}

pulse();
setInterval(pulse, 1000);