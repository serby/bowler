var os = require('os');

module.exports = function (ligthSwitch) {
  var t;

  function displayFollowerCount() {
    var twitterFollowerCount = 7;
    ligthSwitch.binary(twitterFollowerCount);
  }

  return {
    name: 'twitter-count',
    start: function() {
      var count = 6;
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
          t = setInterval(displayFollowerCount, 500);
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