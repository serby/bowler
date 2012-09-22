module.exports = function lightSwitch(gpio, callback) {

  if (typeof gpio === 'function') {
    callback = gpio;
    gpio = require('gpio');
  }

  // Which ports to use
  var gpioPorts = [0, 1, 4, 7, 8, 9]
    , ledCount = gpioPorts.length
    , led = {}
    , self = {}
    , ledNumber = 0
    ;

  function on(n) {
    led[n].gpio.set();
    led[n].on = true;
    return self;
  }

  function off(n) {
    led[n].gpio.set(0);
    led[n].on = false;
    return self;
  }

  function isOn(n) {
    return led[n].on;
  }

  function bar(percentage) {
    var c = Math.round(ledCount * percentage);
    for (var i = 0; i < ledCount; i++) {
      if (i < c) {
        on(i);
      } else {
        off(i);
      }
    }
  }

  function progress(percentage) {
    var c = Math.round((ledCount - 1) * percentage);
    for (var i = 0; i < ledCount; i++) {
      if (i === c) {
        on(i);
      } else {
        off(i);
      }
    }
  }

  function chase() {

  }

  function morse(message) {

  }

  function bounce() {

  }

  function currentState() {
    var state = '';
    for (var i = 0; i < ledCount; i++) {
      state += isOn(i) ? '1' : '0';
    }
    return state;
  }

  self.on = on;
  self.off = off;
  self.bar = bar;
  self.progress = progress;
  self.isOn = isOn;
  self.currentState = currentState;
  self.length = ledCount;

  // Init the GPIO and return the light switch
  gpioPorts.forEach(function(gpioNumber) {
    var g = gpio.export(gpioNumber, {
      ready: function() {
        led[ledNumber] = {
          gpio: g,
          on: false
        };
        // Ensure they are all off
        g.set(0);

        ledNumber += 1;
        if (ledNumber === ledCount) {
          callback(self);
        }
      }
    });
  });
};