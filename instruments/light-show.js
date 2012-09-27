module.exports = function(lightSwitch) {

  var sequence = require('../light-switch/sequence')(lightSwitch)
    , running = false
    , bt
    , rt
    , bouncer
    , random
    ;

  return {
    name: 'lightShow',
    start: function(callback) {
      if (running) {
        return callback(new Error('Light-show already running'));
      }
      running = true;
      bouncer = sequence.bounce();
      bt = setTimeout(function() {
        bouncer.stop();
        random = sequence.random()
          ;
        rt = setTimeout(function() {
          random.stop();
          running = false;
          if (callback) {
            callback();
          }
        }, 6000);
      }, 6000);
    },
    stop: function(callback) {
      clearInterval(rt);
      clearInterval(bt);
      if (bouncer) {
        bouncer.stop();
      }
      if (random) {
        random.stop();
      }
      running = false;
      lightSwitch.off();
      callback();
    }
  };
};