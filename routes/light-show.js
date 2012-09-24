var lightSwitch = require('../light-switch/light-switch')()
  , sequence = require('../light-switch/sequence')(lightSwitch)
  , running = false
  ;

module.exports = function (req, res) {
  if (running) {
    return res.send('Light show already running');
  }
  running = true;
  var bouncer = sequence.bounce();
  setTimeout(function() {
    bouncer.stop();
    var random = sequence.random();
    setTimeout(function() {
      random.stop();
      running = false;
    }, 6000);
  }, 6000);

  res.redirect('/');
};