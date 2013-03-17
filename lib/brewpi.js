//  This is the main file of the BrewPi Node library.
//
//  This file is responsible for creating and exporting the public BrewPi functionality.
//  In addition to creating the public API, it instantiates the serial port connection to the Arduino.
//  As this is the only file with direct access to the serial port, this file is also
//  responsible for writing messages to the Arduino, as well as receiving data from the Arduino
//  and passing it along.


// BrewPi Setup
// ------------

// Module dependencies.
var util = require('util'),
    events = require('events'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    settings = require('./settings'),
    BrewPiInterface = require('./interface');

// Current version of Node BrewPi. Keep in sync with `package.json`.
exports.version = '0.1.1-alpha';

// BrewPi Constructor
// ------------------
var BrewPi = function(options) {

  // Create a new BrewPi instance, regardless of how it's called
  if((this instanceof BrewPi) === false) {
    return new BrewPi();
  }

  // Bring in local serial port setting
  this.serialPort = options && options.serialPort ? options.serialPort : '/dev/ttyACM0';

  // Bring in settings
  this.settings = settings;

  // Method returns a new serial port instance
  this.createBrewPiConnector = function() {
    var brewPiConnector = new SerialPort(this.serialPort, {
      baudrate: 57600,
      parser: serialport.parsers.readline('\n')
    });

    return brewPiConnector;
  };

  // Method attaches events to serial port connector passed as first argument
  this.attachConnectorEvents = function(connector, callback) {
    var self = this;

    // When the serial port is connected, attach events and handle data
    connector.on('open', function () {

      // When data is received, deal with it
      connector.on('data', function(data) {
        self.handleBrewPiSerialData(data);
      });

      // If a function is passed as the `callback`, execute it
      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  // Method takes raw data from serial port and handles it
  this.handleBrewPiSerialData = function(serialData) {
    console.log('Settings: ', this.settings);
    var serialDataKey = serialData[0];

    var serialDataEventMap = {
      T: 'ardTemp',   // Process temperature line
      D: 'ardDebug',  // Debug received
      L: 'ardLCD',    // LCD content received
      C: 'ardCC',     // Control constant received
      S: 'ardCS',     // Control settings received
      V: 'ardCV'      // Control variables received
    };

    if (serialDataEventMap.hasOwnProperty(serialDataKey)) {
      this.emit(serialDataEventMap[serialDataKey], serialData);
    } else {
      console.log('Can\'t process line from Arduino: ', serialData[0]);
      this.emit('ardInvalid', serialData);
    }
  };

  // Methods creates a serial port connection and attaches events
  this.create = function(createCallback) {

    this.brewPiConnector = this.createBrewPiConnector();

    this.attachConnectorEvents(this.brewPiConnector, createCallback);

    // Create a new arduino read interface
    var brewPiInterface = new BrewPiInterface({
      brewPi: this
    });
  };

  events.EventEmitter.call(this);
};

// Inherit event emmitter object
util.inherits(BrewPi, events.EventEmitter);


// BrewPi Public API
// -----------------

// Expose BrewPi `start` prototype
BrewPi.prototype.start = function() {
  var self = this;

  // Set up a new BrewPi
  this.create(function() {
    var dataLoop = function() {
      setTimeout(function() {
        // Refresh control settings
        self.refreshControlSettings();
      },1000);

      setTimeout(function() {
        // Refresh constant settings
        self.refreshControlConstants();
      },3000);

      setTimeout(function() {
        // Refresh constant settings
        self.getTemperatureData();
      },4000);

    };

    // Start the BrewPi loop
    self.intervalLoop = setInterval(dataLoop, 5000);

    // Emit the start event
    self.emit('brewPiStart');
  });
};

// Expose BrewPi `stop` prototype
BrewPi.prototype.stop = function() {
  if (this.intervalLoop) {
    clearInterval(this.intervalLoop);
    console.log('BrewPi logging stopped.');
    this.emit('brewPiStop');
  } else {
    console.log('BrewPi not running.');
  }
};

// Expose BrewPi getter prototypes
// -------------------------------

// Get BrewPi mode
BrewPi.prototype.getMode = function() {
  return this.settings.controlSettings.mode;
};

// Get current fridge semperature aetting
BrewPi.prototype.getFridgeTemperatureSetting = function() {
  return this.settings.controlSettings.fridgeSetting;
};

// Get current beer temperature setting
BrewPi.prototype.getBeerTemperatureSetting = function() {
  return this.settings.controlSettings.beerSetting;
};

// Get current Control Settings
BrewPi.prototype.getControlSettings = function() {
  return this.settings.controlSettings;
};

// Get current Control Constants
BrewPi.prototype.getControlConstants = function() {
  return this.settings.controlConstants;
};

// Get current Control Variables
BrewPi.prototype.getControlVariables = function() {
  return this.settings.controlVariables;
};

// Get current temperature information from arduino
BrewPi.prototype.getTemperatureData = function() {
  this.brewPiConnector.write('t');
};

// Refresh Control Settings from arduino
BrewPi.prototype.refreshControlSettings = function() {
  this.brewPiConnector.write('s');
};

// Refresh Control Constants from arduino
BrewPi.prototype.refreshControlConstants = function() {
  this.brewPiConnector.write('c');
};

// Refresh Control Variables from arduino
BrewPi.prototype.refreshControlVariables = function() {
  this.brewPiConnector.write('v');
};

// Load arduino with default Control Settings from AVR code
BrewPi.prototype.loadDefaultControlSettings = function() {
  this.brewPiConnector.write('S');
};

// Load arduino with default Control Constants from AVR code
BrewPi.prototype.loadDefaultControlConstants = function() {
  this.brewPiConnector.write('C');
};

// Send settings to arduino
BrewPi.prototype.sendSettings = function(jsonData) {
  var dataString = JSON.stringify(jsonData);
  this.brewPiConnector.write('j' + dataString);
};

// Expose BrewPi constructor
// -------------------------
exports = module.exports = BrewPi;
