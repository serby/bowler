var os = require('os');

module.exports = function (ligthSwitch) {
  var t;

  function showLoad() {
    var load = 0.1 + (os.loadavg()[0] / os.cpus().length);
    ligthSwitch.bar(load);
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
      }, 500);
    },
    stop: function(callback) {
      clearInterval(t);
      ligthSwitch.off();
      callback();
    }
  };
};