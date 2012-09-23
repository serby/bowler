module.exports = function lightSwitch(simpleGpio, callback) {

  if (typeof simpleGpio === 'function') {
    callback = simpleGpio;
    simpleGpio = require('./simple-gpio')();
  }

  // Which ports to use
  var gpioPorts = [4, 17, 0]
    , ledCount = gpioPorts.length
    , led = {}
    , self = {}
    , ledNumber = 0
    ;

  function on(n) {
    simpleGpio.set(led[n], 1);
    led[n].on = true;
    return self;
  }

  function off(n) {
    simpleGpio.set(led[n], 0);
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
    simpleGpio.export(gpioNumber, function() {
      led[ledNumber] = gpioNumber;
      // Ensure they are all off
      simpleGpio.setDirection(gpioNumber, 'out', function() {
        simpleGpio.set(gpioNumber, 0);
      });

      ledNumber += 1;
      if (ledNumber === ledCount) {
        callback(self);
      }
    });
  });
};