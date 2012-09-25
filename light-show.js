module.exports = function(lightSwitch) {

  var sequence = require('./light-switch/sequence')(lightSwitch)
    , running = false
    ;

  return {
    name: 'lightShow',
    start: function(callback) {
      if (running) {
        return callback(new Error('Light-show already running'));
      }
      running = true;
      var bouncer = sequence.bounce();
      setTimeout(function() {
        bouncer.stop();
        var random = sequence.random();
        setTimeout(function() {
          random.stop();
          running = false;
          if (callback) {
            callback();
          }
        }, 6000);
      }, 6000);
    }
  };
};