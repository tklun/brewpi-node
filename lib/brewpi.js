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
  this.create = function(createCallback) {
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

      if (typeof createCallback === 'function') {
        createCallback();
      }
    });

    this.brewPiConnector = brewPiConnector;

    // Create a new Arduino read interface
    var brewPiInterface = new BrewPiInterface({
      brewPi: this
    });
  };

  this.handleBrewPiSerialData = function(serialData) {
    console.log('Settings: ', this.settings);
    var serialDataKey = serialData[0];

    var serialDataEventMap = {
      T: 'ardTemp',   // Process temperature line
      D: 'ardDebug',  // Debug received
      L: 'ardLCD',    // LCD content Received
      C: 'ardCC',     // Control constant received
      S: 'ardCS',     // Control settings received
      V: 'arcCV'      // Control variables received
    };

    if (serialDataEventMap.hasOwnProperty(serialDataKey)) {
      this.emit(serialDataEventMap[serialDataKey], serialData);
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
  var self = this;

  this.create(function() {

    var dataLoop = function() {

      setTimeout(function() {
        // Initializing control settings
        self.refreshControlSettings();
      },1000);

      setTimeout(function() {
        // Initializing constant settings
        self.refreshControlConstants();
      },3000);

    };

    self.intervalLoop = setInterval(dataLoop, 5000);
    this.emit('brewPiStart');

  });
};

BrewPi.prototype.stop = function() {
  if (this.intervalLoop) {
    clearInterval(this.intervalLoop);
    console.log('BrewPi logging stopped.');
    this.emit('brewPiStop');
  } else {
    console.log('BrewPi not running.');
  }
};

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
