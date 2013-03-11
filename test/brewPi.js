var BrewPi = require('../'),
    should = require('chai').should(),
    sinon = require('sinon'),
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
      var testBrewPiInstance = new BrewPi();
      testBrewPiInstance.brewPiConnector = function() {
        return new SerialPort('/path/to/fake/usb');
      };

      // testBrewPiInstance.brewPiConnector.emit('open');


      testBrewPiInstance.create(function() {
        // testBrewPiInstance.brewPiConnector.emit('open');
      });
    });

    it('should fire a callback function when connection has been opened');


  });

  describe('retrieve settings', function() {
    it('should be able to get the current beer temperature setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getBeerTemperatureSetting();

      testBrewPiInstance.settings.controlSettings.beerSetting.should.equal(setting);
    });

    it('should be able to get the current fridge temperature setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getFridgeTemperatureSetting();

      testBrewPiInstance.settings.controlSettings.fridgeSetting.should.equal(setting);
    });


    it('should be able to get the current mode setting', function() {
      var testBrewPiInstance = new BrewPi();
      var setting = testBrewPiInstance.getMode();

      testBrewPiInstance.settings.controlSettings.mode.should.equal(setting);
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

});
