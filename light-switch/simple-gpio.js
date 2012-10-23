var fs = require('fs')
  , path = require('path')
  , gpiopath = '/sys/class/gpio/'
  ;

module.exports = function simpleGpio() {

  function exportGpio(n) {
    if (path.existsSync(path.join(gpiopath, 'gpio' + n))) {
      // already exported, unexport and export again
      console.error('Header already exported');
      return false;
    } else {
      console.info('Exporting gpio' + n);
      return fs.writeFile(path.join(gpiopath, 'export'), n);
    }
  }

  function unexport(n) {
    if (!path.existsSync(path.join(gpiopath, 'gpio' + n))) {
      // already exported, unexport and export again
      console.error('Not exported', n);
      return false;
    } else {
      console.info('Unexporting gpio' + n);
      return fs.writeFile(path.join(gpiopath, 'unexport'), n);
    }
  }

  function setDirection(n, direction) {
    console.info('Set direction', n, direction);
    return fs.writeFile(path.join(gpiopath, 'gpio' + n + '/direction'), direction);
  }

  function set(n, value) {
    console.info(Date.now(), 'Set value', n, value);
    return fs.writeFile(path.join(gpiopath, 'gpio' + n + '/value'), value);
  }

  return {
    export: exportGpio,
    unexport: unexport,
    setDirection: setDirection,
    set: set
  };
};