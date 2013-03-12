var BrewPi = require('../'),
    should = require('chai').should(),
    sinon = require('sinon'),
    clock = sinon.useFakeTimers(),
    csrequire = require('covershot').require.bind(null, require),
    BrewPi = csrequire('../lib/brewpi'),
    SerialPort = require('./MockSerialPort').SerialPort;

describe('brewPi', function(){
  describe('instantiation', function(){

    it('should create a new instance when called directly', function(){
      var brewPiCalledDirectly = BrewPi();

      (brewPiCalledDirectly instanceof BrewPi).should.equal(true);
    });

  });

  describe('create', function() {
    it('should have a reference to it\'s parent context');

    it('should create a new brewPiConnector and store it as part of itself');

    it('should listen for new data upon connection', function() {
      // TODO - Figure out how to spy on 'data' event
      // var testBrewPiInstance = new BrewPi(),
      //     spy = sinon.spy(testBrewPiInstance, 'handleBrewPiSerialData');

      // testBrewPiInstance.brewPiConnector = function() {
      //   return new SerialPort('/path/to/fake/usb');
      // };

      // testBrewPiInstance.create();

      // process.nextTick(function(){
      //   testBrewPiInstance.emit('data');
      //   spy.calledOnce.should.equal(false);
      // });
    });

    it('should fire a callback function when connection has been opened', function() {
      var testBrewPiInstance = new BrewPi(),
          spy = sinon.spy();

      testBrewPiInstance.brewPiConnector = function() {
        return new SerialPort('/path/to/fake/usb');
      };

      testBrewPiInstance.create(spy);

      process.nextTick(function(){
        spy.calledOnce.should.equal(true);
      });

    });

  });

  describe('incoming serial port data', function () {

    var testBrewPiInstance = new BrewPi(),
        mockArduinoResponses = {
          temp: 'T:{\"BeerTemp\": 40}',
          lcd:  'L: Just some string to display',
          debug: 'D: some debug info',
          controlConstants: 'C:{"stubbed": "constants"}',
          controlSettings: 'S:{"stubbed": "settings"}',
          controlVariables: 'V:{"stubbed": "constants"}'
        };

    it('should handle temperature data', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardTemp', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.temp);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.temp).should.equal(true);
    });

    it('should handle debug message', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardDebug', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.debug);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.debug).should.equal(true);
    });

    it('should handle LCD messages', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardLCD', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.lcd);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.lcd).should.equal(true);
    });

    it('should handle control constant messages', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardCC', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.controlConstants);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlConstants).should.equal(true);
    });

    it('should handle control settings messages', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardCS', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.controlSettings);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlSettings).should.equal(true);
    });

    it('should handle control variables messages', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardCV', spy);

      testBrewPiInstance.handleBrewPiSerialData(mockArduinoResponses.controlVariables);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlVariables).should.equal(true);
    });

    it('should handle invalid messages', function () {
      var spy = sinon.spy();
      testBrewPiInstance.on('ardInvalid', spy);

      testBrewPiInstance.handleBrewPiSerialData('asdf');

      spy.calledOnce.should.equal(true);
      spy.calledWith('asdf').should.equal(true);
    });
  });

  describe('retrieve settings', function() {
    it('should be able to get the current beer temperature setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getBeerTemperatureSetting();

      (testBrewPiInstance.settings.controlSettings.beerSetting).should.equal(setting);
    });

    it('should be able to get the current fridge temperature setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getFridgeTemperatureSetting();

      (testBrewPiInstance.settings.controlSettings.fridgeSetting).should.equal(setting);
    });

    it('should be able to get the current mode setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getMode();

      (testBrewPiInstance.settings.controlSettings.mode).should.equal(setting);
    });

    it('should be able to get the current control settings', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getControlSettings();

      testBrewPiInstance.settings.controlSettings.should.equal(setting);
    });

    it('should be able to get the current control constants', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getControlConstants();

      testBrewPiInstance.settings.controlConstants.should.equal(setting);
    });

    it('should be able to get the current control variables', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getControlVariables();

      testBrewPiInstance.settings.controlVariables.should.equal(setting);
    });

  });

  describe('write to arduino through serial port', function () {

    var testBrewPiInstance,
        spy;

    beforeEach(function(){
      testBrewPiInstance = new BrewPi();
      testBrewPiInstance.brewPiConnector = new SerialPort('/path/to/fake/usb');
      spy = sinon.spy(testBrewPiInstance.brewPiConnector, 'write');
    });

    afterEach(function() {
      testBrewPiInstance.brewPiConnector.write.restore();
    });

    describe('control settings', function() {
      it('should be write to refresh the control settings once', function () {
        testBrewPiInstance.refreshControlSettings();
        spy.calledOnce.should.equal(true);
      });

      it('should be write \'s\' to the serial port', function(){
        testBrewPiInstance.refreshControlSettings();
        spy.calledWith('s').should.equal(true);
      });
    });

    describe('control constants', function() {
      it('should be write to refresh the control constants once', function () {
        testBrewPiInstance.refreshControlConstants();
        spy.calledOnce.should.equal(true);
      });

      it('should be write \'c\' to the serial port', function(){
        testBrewPiInstance.refreshControlConstants();
        spy.calledWith('c').should.equal(true);
      });
    });

    describe('control variables', function() {
      it('should be write to refresh the control variables once', function () {
        testBrewPiInstance.refreshControlVariables();
        spy.calledOnce.should.equal(true);
      });

      it('should be write \'v\' to the serial port', function(){
        testBrewPiInstance.refreshControlVariables();
        spy.calledWith('v').should.equal(true);
      });
    });

    describe('load default arduino settings', function() {
      it('should be write load default arduino settings', function () {
        testBrewPiInstance.loadDefaultControlSettings();
        spy.calledOnce.should.equal(true);
      });

      it('should be write \'S\' to the serial port', function(){
        testBrewPiInstance.loadDefaultControlSettings();
        spy.calledWith('S').should.equal(true);
      });
    });

    describe('load default arduino constants', function() {
      it('should be write load default arduino constants', function () {
        testBrewPiInstance.loadDefaultControlConstants();
        spy.calledOnce.should.equal(true);
      });

      it('should be write \'C\' to the serial port', function(){
        testBrewPiInstance.loadDefaultControlConstants();
        spy.calledWith('C').should.equal(true);
      });
    });

  });

  describe('run loop', function () {
    describe('start run loop', function () {
      it('should fire an event when initiated', function () {
        var testBrewPiInstance = new BrewPi(),
            spy = sinon.spy();

        testBrewPiInstance.brewPiConnector = function() {
          return new SerialPort('/path/to/fake/usb');
        };

        testBrewPiInstance.on('brewPiStart', spy);

        testBrewPiInstance.start();

        process.nextTick(function(){
          spy.calledOnce.should.equal(true);
        });
      });
    });

  });

});
