var _ = require('lodash')
  , noop = function() {}
  ;

module.exports = function (lightSwitch) {


  function sequence(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    callback = callback || noop;
    options = _.extend({
      duration: 1000,
      direction: 'up'
      },
      options);

    console.info('Sequence duration:', options.duration);
    var led
      , inc
      , end
      ;
    if (options.direction === 'up') {
      led = 0;
      inc = 1;
      end = lightSwitch.length;
    } else {
      led = lightSwitch.length - 1;
      inc = -1;
      end = -1;
    }

    lightSwitch.on(led);
    led += inc;
    var s;
    var durationPerLed = Math.round(options.duration / lightSwitch.length);
    var
      t = setInterval(function() {
        if (led === end) {
          clearInterval(t);
          return callback();
        }

        lightSwitch.off(led - inc);

        lightSwitch.on(led);
        led += inc;

      }, durationPerLed);
  }

  function flash(interval) {
    var timer = startInterval(interval || 100)
      , on = false
      ;
    function addFlash() {

      timer.add(function() {
        if (on) {
          lightSwitch.on();
        } else {
          lightSwitch.off();
        }
        on = !on;
      });

      timer.add(addFlash);
    }
    addFlash();
    return {
      stop: function() {
        on = false;
        timer.add(lightSwitch.off);
        timer.add(timer.stop);
      }
    };
  }

  function morse (message) {
    var code = morse.decode(message);

  }

  function startInterval (dur) {
    var queue = [];
    var t = setInterval(function() {

      var fn = queue.shift();
      if (typeof fn === 'function') {
        fn();
      }

    }, dur || 100);
    var self = {
      stop: function() {
        clearInterval(t);
      },
      add: function(fn) {
        queue.push(fn);
        return self;
      },
      clear: function() {
        queue = [];
      }
    };
    return self;
  }

  function bounce(interval) {
    var timer = startInterval(interval)
      , bouncing = true;

    function addBounce() {
      for (var i = 0; i < lightSwitch.length; i++) {
        timer.add(function(n) {
          if (n > 0) {
            lightSwitch.off(n - 1);
          }
          lightSwitch.on(n);
        }.bind(null, i));
      }
      for (i = lightSwitch.length - 1; i >= 0; i--) {
        timer.add(function(n) {
          if (n < lightSwitch.length - 1) {
            lightSwitch.off(n + 1);
          }
          lightSwitch.on(n);
        }.bind(null, i));
      }

      if (bouncing) {
        timer.add(addBounce);
      }
    }

    addBounce();

    return {
      stop: function() {
        bouncing = false;
        timer.add(lightSwitch.off);
        timer.add(timer.stop);
      }
    };
  }

  function random(interval) {
    var timer = startInterval(interval || 100)
      , on = true
      ;
    function addRandom() {

      timer.add(function() {
        var onRnd = Math.round(Math.random() * (lightSwitch.length - 1))
          , offRnd = Math.round(Math.random() * (lightSwitch.length - 1));

        lightSwitch.on(onRnd);
        if (onRnd !== offRnd) {
          lightSwitch.off(offRnd);
        }
      });
      if (on) {
        timer.add(addRandom);
      }
    }
    addRandom();
    return {
      stop: function() {
        on = false;
        timer.add(lightSwitch.off);
        timer.add(timer.stop);
      }
    };
  }

  // Hang everything off the main function
  _.extend(sequence, {
    flash: flash,
    bounce: bounce,
    random: random
  });

  return sequence;

};