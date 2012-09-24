var lightSwitch = require('./light-switch')()
  , sequence = require('./sequence')(lightSwitch)
  ;


var bouncer = sequence.bounce();

setTimeout(function() {
  bouncer.stop();
  var random = sequence.random();
  setTimeout(random.stop, 3000);
}, 3000);