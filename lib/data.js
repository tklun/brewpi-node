// BrewPi Data Layer Setup
// ---------------------

// Module dependencies.
var util = require('util'),
    cube = require('cube');

var BrewPiData = {
  createDataEmitter: function() {
    var wsPath = '';
    var client = cube.emitter(wsPath);

    return client;
  }
};



// Expose BrewPiInterface constructor
// -----------------------------------
exports = module.exports = BrewPiData;
