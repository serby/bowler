var os = require('os-utils')
  ;

module.exports = function (ligthSwitch) {
  var t;

  function showLoad() {
    os.cpuUsage(function(usage) {
      ligthSwitch.bar(usage);
    });
  }

  return {
    name: 'load-display',
    start: function(callback) {
      var count = 4;
      t = setInterval(function() {
        if (count > 0) {

          if (count % 2 === 0) {
            ligthSwitch.on();
          } else {
            ligthSwitch.off();
          }

          count -= 1;
        } else {
          clearInterval(t);
          t = setInterval(showLoad, 500);
        }
      }, 1000);
    },
    stop: function(callback) {
      clearInterval(t);
      ligthSwitch.off();
      callback();
    }
  };
};