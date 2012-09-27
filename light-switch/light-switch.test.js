var assert = require('assert')
  , lightSwitch = require('./light-switch')(require('./mock-simple-gpio')());

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

lightSwitch.binary(1);
assert.equal(lightSwitch.currentState(), '000001');
