module.exports = function() {
  var instruments = {}
    , currentInstrument;

  return {
    add: function(instrument) {
      if (instrument.name === undefined) {
        throw new Error('Instrument must have a .name property');
      }
      instruments[instrument.name] = instrument;
    },
    pickup: function(name) {
      var instrument = instruments[name];
      if (instrument === undefined) {
        throw new Error('Unknown instrument ' + name);
      }
      if (currentInstrument) {
        throw new Error('Another instrument is in use ' +
          currentInstrument.name + ' drop first.');
      }

      currentInstrument = instrument;

      return instrument;
    },
    drop: function() {
      currentInstrument = undefined;
    }
  };
};