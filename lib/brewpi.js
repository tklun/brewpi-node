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
  if(false === (this instanceof BrewPi)) {
      return new BrewPi();
  }

  this.serialPort = options.serialPort || '/dev/ttyACM0';
  this.settings = settings;

  events.EventEmitter.call(this);
};

sys.inherits(BrewPi, events.EventEmitter);

BrewPi.prototype.create = function() {
  var self = this;

  this.brewPiConnector = new SerialPort(this.serialPort, {
    baudrate: 57600,
    parser: serialport.parsers.readline('\n')
  });

  // Attach
  this.brewPiConnector.on('open', function () {
    console.log('New BrewPi connection created');

    this.brewPiConnector.on('data', function(data) {
      console.log('Settings: ', self.settings);

      if (data[0] === 'T') {
        // Process temperature line
        // console.log('temp: ', data);

        self.emit('ardTemp', data);

      } else if (data[0] === 'D') {
        // Debug received
        // console.log('Arduino debug message: ', data);

        self.emit('ardDebug', data);

      } else if (data[0] === 'L') {
        // LCD Content Received
        // console.log('LCD: ', data);

        self.emit('ardLCD', data);

      } else if (data[0] === 'C') {
        // Control constant received
        // console.log('Control constant: ', data);

        self.emit('ardCC', data);

      } else if (data[0] === 'S') {
        // Control settings received
        // console.log('Control settings: ', data);

        self.emit('ardCS', data);

      } else if (data[0] === 'V') {
        // Control variables received
        // console.log('Control variables: ', data);

        self.emit('ardCV', data);

      } else {
        // console.log('Can\'t process line from Arduino: ', data[0]);

        self.emit('ardInvalid', data);

      }
    });
  });

  // Create a new Arduino read interface
  var brewPiInterface = new BrewPiInterface({
    brewPi: this
  });

};

/**
 * Expose BrewPi prototypes.
 */

// Retrieve Data
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

BrewPi.prototype.getcontrolVariables = function() {
  return this.settings.controlVariables;
};

// Set Data



/**
 * Expose constructor.
 */

exports = module.exports = BrewPi;
