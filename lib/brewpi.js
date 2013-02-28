/**
 * Module dependencies.
 */

var serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    communicator = require('./communicator');

/**
 * Expose `createBrewPi()`.
 */

// exports = module.exports = createBrewPi;

/**
 * Create a BrewPi Constructor.
 *
 * @return {Function}
 * @api public
 */

var BrewPi = function(options) {

  var brewPiConnector;

  this.serialPort = options.serialPort || '/dev/ttyACM0';

  this.ping = function() {
    brewPiConnector.write('l');
  };

  this.create = function() {

    brewPiConnector = new SerialPort(this.serialPort, {
      baudrate: 57600,
      parser: serialport.parsers.readline('\n')
    });

    brewPiConnector.on('open', function () {
      console.log('New BrewPi connection created');

      brewPiConnector.on('data', function(data) {
        console.log(data);

        if (data[0] === 'T') {
          // Process temperature line
          console.log('temp: ', data);
        } else if (data[0] === 'D') {
          // Debug received
          console.log('Arduino debug message: ', data);
        } else if (data[0] === 'L') {
          // LCD Content Received
          console.log('LCD: ', data);
        } else if (data[0] === 'C') {
          // Control constant received
          console.log('Control constant: ', data);
        } else if (data[0] === 'S') {
          // Control settings received
          console.log('Control settings: ', data);
        } else if (data[0] === 'V') {
          // Control variables received
          console.log('Control variables: ', data);
        } else {
          console.log('Can\'t process line from Arduino: ', data[0]);
        }
      });

      setTimeout(function() {
        brewPiConnector.write('l');
        next();
      }, 2000);

    });


    return brewPiConnector;
  };

};

/**
 * Expose the prototypes.
 */

// exports.application = proto;
// exports.request = req;
// exports.response = res;

/**
 * Expose constructors.
 */

exports.BrewPi = BrewPi;

