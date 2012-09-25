var  os = require('os');

module.exports = function (ligthSwitch) {
  var t;

  function showLoad() {
    ligthSwitch.bar(os.loadavg() / 100);
  }

  return {
    name: 'load-display',
    start: function() {
      t = setInterval(showLoad);
    },
    stop: function() {
      clearInterval(t);
    }
  };
};