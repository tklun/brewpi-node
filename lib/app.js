/**
 * Module dependencies.
 */

var BrewPi = require('./brewpi'),
    config = require('./config');

/**
 * Expose `createBrewPi()`.
 */

exports = module.exports = createBrewPi;

/**
 * BrewPi version.
 */

exports.version = '0.1.0';

/**
 * Create a BrewPi application.
 *
 * @return {Function}
 * @api public
 */

function createBrewPi() {

  var brewPi = new BrewPi({
    serialPort: config.serialPort
  });

  brewPi.start();

  return brewPi;
}



/**
 * Expose the prototypes.
 */

// exports.application = proto;
// exports.request = req;
// exports.response = res;

/**
 * Expose constructors.
 */

// exports.SerialPort = SerialPort;

