module.exports = function() {
  var instruments = {}
    , currentInstrument
    , cycleInstrument
    ;

  function startNext() {
    var names = Object.keys(instruments)
      , name = names[Math.round(Math.random() * (names.length - 1))]
      ;

    cycleInstrument = instruments[name];

    console.log(names, name, cycleInstrument);
    if (cycleInstrument === undefined) {
      return false;
    }
    console.log('Starting ', name);
    cycleInstrument.start();
  }

  function cycle() {
    if (currentInstrument !== undefined) {
      return false;
    }

    if (cycleInstrument !== undefined) {
      console.log('Stopping', cycleInstrument.name);
      cycleInstrument.stop(startNext);
    } else {
      startNext();
    }
  }

  setInterval(cycle, 70000);

  return {
    add: function(instrument) {
      if (instrument.name === undefined) {
        throw new Error('Instrument must have a .name property');
      }
      instruments[instrument.name] = instrument;
    },
    pickup: function(name, callback) {
      var instrument = instruments[name];
      if (instrument === undefined) {
        throw new Error('Unknown instrument ' + name);
      }
      if (currentInstrument) {
        throw new Error('Another instrument is in use ' +
          currentInstrument.name + ' drop first.');
      }

      if (cycleInstrument !== undefined) {

        cycleInstrument.stop(function() {
          currentInstrument = instrument;
          callback(undefined, instrument);
        });

      } else {
        currentInstrument = instrument;
        callback(undefined, instrument);
      }
    },
    drop: function() {
      currentInstrument.stop(function() {
        currentInstrument = undefined;
      });
    }
  };
};