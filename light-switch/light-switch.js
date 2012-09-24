module.exports = function lightSwitch(simpleGpio) {

  if (simpleGpio === undefined) {
    simpleGpio = require('./simple-gpio')();
  }

  // Which ports to use
  var gpioPorts = [0, 1, 4, 14, 15, 17]
    , ledCount = gpioPorts.length
    , led = {}
    , self = {}
    , ledNumber = 0
    ;

  function validate(n) {
    if (led[n] === undefined) {
      throw new Error('Invalid led: ' + n);
    }
  }

  function on(n) {
    if (n === undefined) {
      return bar(1);
    }
    validate(n);
    simpleGpio.set(led[n], 1);
    led[n].on = true;
    return self;
  }

  function off(n) {
    if (n === undefined) {
      return bar(0);
    }
    validate(n);
    simpleGpio.set(led[n], 0);
    led[n].on = false;
    return self;
  }

  function isOn(n) {
    validate(n);
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
    bar(0);
    on(Math.round((ledCount - 1) * percentage));
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
    simpleGpio.export(gpioNumber);
    led[ledNumber] = gpioNumber;

    // Ensure they are all off
    simpleGpio.setDirection(gpioNumber, 'out');
    simpleGpio.set(gpioNumber, 0);

    ledNumber += 1;
  });

  return self;
};