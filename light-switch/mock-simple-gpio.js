module.exports = function simpleGpio() {

  var exported = {};

  function exportGpio(n) {
    if (exported[n]) {
      // already exported, unexport and export again
      console.error('Header already exported');
      return false;
    } else {
      console.info('Exporting gpio' + n);
      exported[n] = true;
      return true;
    }
  }

  function unexport(n) {
    if (!exported[n]) {
      // already exported, unexport and export again
      console.error('Not exported', n);
      return false;
    } else {
      console.info('Unexporting gpio' + n);
      exported[n] = undefined;
      return true;
    }
  }

  function setDirection(n, direction) {
    console.info('Set direction', n, direction);
  }

  function set(n, value) {
    console.info(Date.now(), 'Set value', n, value);
  }

  return {
    export: exportGpio,
    unexport: unexport,
    setDirection: setDirection,
    set: set
  };
};