var ports = [0, 1, 4, 7, 8, 9, 10, 11, 14, 15, 17, 18, 21, 22, 23, 24, 25]
  , simpleGpio = require('../simple-gpio')()
  , doneCount = 0
  ;

ports.forEach(function(n) {
  simpleGpio.export(n, function() {
    simpleGpio.setDirection(n, 'out', function() {
      simpleGpio.set(n, 1);
      setTimeout(function() {
        simpleGpio.set(n, 0);
        doneCount++;
        if (doneCount === ports.length) {
          ports.forEach(function(n) {
            simpleGpio.unexport(n, function() {
            });
          });
        }
      }, 1000);
    });
  });
});
