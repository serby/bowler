var assert = require('assert');

function createMockGpio() {
  var gpios = {};
  return {
    export: function(number, option) {

      gpios[number] = {
        direction: option.direction || 'out',
        on: false
      };
      process.nextTick(option.ready);
      return {
        set: function(value) {
          gpios[number].on = (value === undefined || value === 1);
        },
        reset: function() {
          gpios[number].on = false;
        },
        unexport: function(callback) {
          if (callback) {
            callback();
          }
        }
      };
    }
  };
}

require('../light-switch')(createMockGpio(), function(lightSwitch) {

  lightSwitch.on(0);
  assert(lightSwitch.isOn(0));
  assert.equal(lightSwitch.currentState(), '100000');
  lightSwitch.off(0);
  assert.equal(lightSwitch.currentState(), '000000');

  lightSwitch.bar(0.5);
  assert.equal(lightSwitch.currentState(), '111000');
  lightSwitch.bar(0);
  assert.equal(lightSwitch.currentState(), '000000');
  lightSwitch.bar(1);
  assert.equal(lightSwitch.currentState(), '111111');

  lightSwitch.progress(0);
  assert.equal(lightSwitch.currentState(), '100000');
  lightSwitch.progress(0.16);
  assert.equal(lightSwitch.currentState(), '010000');
  lightSwitch.progress(0.5);
  assert.equal(lightSwitch.currentState(), '000100');
  lightSwitch.progress(1);
  assert.equal(lightSwitch.currentState(), '000001');
});