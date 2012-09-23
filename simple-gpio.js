var fs = require('fs')
  , path = require('path')
  , gpiopath = '/sys/class/gpio/'
  ;

module.exports = function simpleGpio() {

  function exportGpio(n, callback) {
    if (path.existsSync(path.join(gpiopath, 'gpio' + n))) {
      // already exported, unexport and export again
      console.error('Header already exported');
      return callback();
    } else {
      console.info('Exporting gpio' + n);
      fs.writeFile(path.join(gpiopath, 'export'), n, function(error) {
        callback(error);
      });
    }
  }

  function unexport(n, callback) {
    if (!path.existsSync(path.join(gpiopath, 'gpio' + n))) {
      // already exported, unexport and export again
      console.error('Not exported', n);
      return callback();
    } else {
      console.info('Unexporting gpio' + n);
      fs.writeFile(path.join(gpiopath, 'unexport'), n, function(error) {
        callback(error);
      });
    }
  }

  function setDirection(n, direction, callback) {
    fs.writeFile(path.join(gpiopath, 'gpio' + n + '/direction'), direction, function(error) {
      callback(error);
    });
  }

  function set(n, value) {
    fs.writeFile(path.join(gpiopath, 'gpio' + n + '/value'), value, function(error) {
    });
  }

  return {
    export: exportGpio,
    unexport: unexport,
    setDirection: setDirection,
    set: set
  };
};