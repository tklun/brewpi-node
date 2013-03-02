/**
 * Module dependencies.
 */

var sys = require('sys'),
    events = require('events'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    settings = require('./settings'),
    BrewPiInterface = require('./interface');

/**
 * Create a BrewPi Constructor.
 *
 * @return {Function}
 * @api public
 */

var BrewPi = function(options) {
  if((this instanceof BrewPi) === false) {
    return new BrewPi();
  }

  this.serialPort = options.serialPort || '/dev/ttyACM0';
  this.settings = settings;

  // Privileged Methods
  this.create = function() {
    var self = this;

    var brewPiConnector = new SerialPort(this.serialPort, {
      baudrate: 57600,
      parser: serialport.parsers.readline('\n')
    });

    // Attach events and handle data
    brewPiConnector.on('open', function () {
      console.log('New BrewPi connection created');

      brewPiConnector.on('data', function(data) {
        self.handleBrewPiSerialData(data);
      });
    });

    this.brewPiConnector = brewPiConnector;

    // Create a new Arduino read interface
    var brewPiInterface = new BrewPiInterface({
      brewPi: this
    });
  };

  this.handleBrewPiSerialData = function(serialData) {
    console.log('Settings: ', this.settings);

    if (serialData[0] === 'T') {
      // Process temperature line
      // console.log('temp: ', data);
      this.emit('ardTemp', serialData);
    } else if (serialData[0] === 'D') {
      // Debug received
      // console.log('Arduino debug message: ', data);
      this.emit('ardDebug', serialData);
    } else if (serialData[0] === 'L') {
      // LCD Content Received
      // console.log('LCD: ', data);
      this.emit('ardLCD', serialData);
    } else if (serialData[0] === 'C') {
      // Control constant received
      // console.log('Control constant: ', data);
      this.emit('ardCC', serialData);
    } else if (serialData[0] === 'S') {
      // Control settings received
      // console.log('Control settings: ', data);
      this.emit('ardCS', serialData);
    } else if (serialData[0] === 'V') {
      // Control variables received
      // console.log('Control variables: ', data);
      this.emit('ardCV', serialData);
    } else {
      // console.log('Can\'t process line from Arduino: ', data[0]);
      this.emit('ardInvalid', serialData);
    }
  };


  events.EventEmitter.call(this);
};

sys.inherits(BrewPi, events.EventEmitter);


/**
 * Expose BrewPi 'start' prototype.
 */

BrewPi.prototype.start = function() {

  this.create();
  // setInterval(function() {console.log('test');},1000);
};

/**
 * Expose BrewPi 'create' prototype.
 */

// BrewPi.prototype.create = function() {
//   var self = this;

//   var brewPiConnector = new SerialPort(this.serialPort, {
//     baudrate: 57600,
//     parser: serialport.parsers.readline('\n')
//   });

//   // Attach
//   brewPiConnector.on('open', function () {
//     console.log('New BrewPi connection created');

//     brewPiConnector.on('data', function(data) {
//       // handleBrewPiSerialData(data).call(self);
//       // handleBrewPiSerialData(data);

//       console.log('Settings: ', self.settings);

//       if (data[0] === 'T') {
//         // Process temperature line
//         // console.log('temp: ', data);

//         self.emit('ardTemp', data);

//       } else if (data[0] === 'D') {
//         // Debug received
//         // console.log('Arduino debug message: ', data);

//         self.emit('ardDebug', data);

//       } else if (data[0] === 'L') {
//         // LCD Content Received
//         // console.log('LCD: ', data);

//         self.emit('ardLCD', data);

//       } else if (data[0] === 'C') {
//         // Control constant received
//         // console.log('Control constant: ', data);

//         self.emit('ardCC', data);

//       } else if (data[0] === 'S') {
//         // Control settings received
//         // console.log('Control settings: ', data);

//         self.emit('ardCS', data);

//       } else if (data[0] === 'V') {
//         // Control variables received
//         // console.log('Control variables: ', data);

//         self.emit('ardCV', data);

//       } else {
//         // console.log('Can\'t process line from Arduino: ', data[0]);

//         self.emit('ardInvalid', data);

//       }
//     });
//   });

//   this.brewPiConnector = brewPiConnector;

//   // Create a new Arduino read interface
//   var brewPiInterface = new BrewPiInterface({
//     brewPi: this
//   });
// };

/**
 * Handle BrewPi serial port data
 *
 * @api private
 */

// TODO
// function handleBrewPiSerialData(serialData) {
//   console.log('Settings: ', self.settings);

//   if (data[0] === 'T') {
//   // Process temperature line
//   // console.log('temp: ', data);

//   self.emit('ardTemp', data);

//   } else if (data[0] === 'D') {
//   // Debug received
//   // console.log('Arduino debug message: ', data);

//   self.emit('ardDebug', data);

//   } else if (data[0] === 'L') {
//   // LCD Content Received
//   // console.log('LCD: ', data);

//   self.emit('ardLCD', data);

//   } else if (data[0] === 'C') {
//   // Control constant received
//   // console.log('Control constant: ', data);

//   self.emit('ardCC', data);

//   } else if (data[0] === 'S') {
//   // Control settings received
//   // console.log('Control settings: ', data);

//   self.emit('ardCS', data);

//   } else if (data[0] === 'V') {
//   // Control variables received
//   // console.log('Control variables: ', data);

//   self.emit('ardCV', data);

//   } else {
//   // console.log('Can\'t process line from Arduino: ', data[0]);

//   self.emit('ardInvalid', data);

//   }
// }
// END TODO


/**
 * Expose BrewPi prototypes.
 */

// Retrieve data from settings
BrewPi.prototype.getMode = function() {
  return this.settings.controlSettings.mode;
};

BrewPi.prototype.getFridgeTemperatureSetting = function() {
  return this.settings.controlSettings.fridgeSetting;
};

BrewPi.prototype.getBeerTemperatureSetting = function() {
  return this.settings.controlSettings.beerSetting;
};

BrewPi.prototype.getControlSettings = function() {
  return this.settings.controlSettings;
};

BrewPi.prototype.getControlConstants = function() {
  return this.settings.controlConstants;
};

BrewPi.prototype.getControlVariables = function() {
  return this.settings.controlVariables;
};

// Refresh settings from Arduino
BrewPi.prototype.refreshControlSettings = function() {
  this.brewPiConnector.write('s');
};

BrewPi.prototype.refreshControlConstants = function() {
  this.brewPiConnector.write('c');
};

BrewPi.prototype.refreshControlVariables = function() {
  this.brewPiConnector.write('v');
};

// Load Arduino with default settings from AVR code
BrewPi.prototype.loadDefaultControlSettings = function() {
  this.brewPiConnector.write('S');
};

BrewPi.prototype.loadDefaultControlConstants = function() {
  this.brewPiConnector.write('C');
};

/**
 * Expose constructor.
 */

exports = module.exports = BrewPi;
