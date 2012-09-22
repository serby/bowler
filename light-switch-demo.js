require('../light-switch')(function(lightSwitch) {

  function sequence(callback) {
    var led = 0
      , t = setTimeout(function() {
        lightSwitch.on(led++);
        if (led === lightSwitch.length) {
          clearTimeout(t);
          if (callback) {
            callback();
          }
        }
      }, 100);
  }

  function fullFlash(callback) {
    var state = true
      , count = 0
      , t = setTimeout(function() {
        lightSwitch.bar(state ? 1 : 0);
        state = !state;
        count++;
        if (count === 10) {
          clearTimeout(t);
          if (callback) {
            callback();
          }
        }
      }, 200);
  }

  sequence(fullFlash);


});