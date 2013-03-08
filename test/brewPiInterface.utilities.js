var BrewPi = require('../'),
    should = require('chai').should(),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    csrequire = require('covershot').require.bind(null, require),
    BrewPiInterface = csrequire('../lib/interface'),
    stripKey = csrequire('../lib/interface').stripKey;

var mockArduinoResponses = {
  temp: 'T:{\"BeerTemp\": 40}',
  lcd:  'Just some string to display',
  controlConstants: 'C:{"stubbed": "constants"}',
  controlSettings: 'S:{"stubbed": "settings"}',
  controlVariables: 'V:{"stubbed": "constants"}'
};

describe('brewPiInterface', function(){
  var testBrewPiInterfaceInstance;

  beforeEach(function(){
    testBrewPiInterfaceInstance = new BrewPiInterface({
      brewPi: new BrewPi()
    });
  });

  describe('update temperature', function () {

    it('should call store temperature method on an event', function(){
      var spy = sinon.spy(testBrewPiInterfaceInstance, 'storeNewTemperatures');

      testBrewPiInterfaceInstance.brewPi.emit('ardTemp', mockArduinoResponses.temp);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.temp).should.equal(true);
    });

    it('should store the temp somewhere');

    it('should emit an event after the temperature is stored', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('newTemperatureData', spy);

      testBrewPiInterfaceInstance.storeNewTemperatures(mockArduinoResponses.temp);
      spy.called.should.equal(true);
    });
  });

  describe('update LCD', function() {

    it('should call update LCD method on an event', function(){
      var spy = sinon.spy(testBrewPiInterfaceInstance, 'updateLCD');

      testBrewPiInterfaceInstance.brewPi.emit('ardLCD', mockArduinoResponses.lcd);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.lcd).should.equal(true);
    });

    it('should do something with the LCD data it receives');

    it('should emit an event when LCD is updated', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('newLCDData', spy);

      testBrewPiInterfaceInstance.updateLCD('someDataString');
      spy.called.should.equal(true);
    });

  });

  describe('update control constants', function () {
    it('should call store control constants method on an event', function(){
      var spy = sinon.spy(testBrewPiInterfaceInstance, 'updateControlConstants');

      testBrewPiInterfaceInstance.brewPi.emit('ardCC', mockArduinoResponses.controlConstants);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlConstants).should.equal(true);
    });

    it('should update control constants');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlConstantsUpdated', spy);

      testBrewPiInterfaceInstance.updateControlConstants(mockArduinoResponses.controlConstants);
      spy.called.should.equal(true);
    });
  });

  describe('update control settings', function () {

    it('should call store control settings method on an event', function(){
      var spy = sinon.spy(testBrewPiInterfaceInstance, 'updateControlSettings');

      testBrewPiInterfaceInstance.brewPi.emit('ardCS', mockArduinoResponses.controlSettings);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlSettings).should.equal(true);
    });

    it('should update control settings');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlSettingsUpdated', spy);

      testBrewPiInterfaceInstance.updateControlSettings(mockArduinoResponses.controlSettings);
      spy.called.should.equal(true);
    });
  });

  describe('update control variables', function () {

    it('should call store control variables method on an event', function(){
      var spy = sinon.spy(testBrewPiInterfaceInstance, 'updateControlVariables');

      testBrewPiInterfaceInstance.brewPi.emit('ardCV', mockArduinoResponses.controlVariables);

      spy.calledOnce.should.equal(true);
      spy.calledWith(mockArduinoResponses.controlVariables).should.equal(true);
    });

    it('should update control variables');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlVariablesUpdated', spy);

      testBrewPiInterfaceInstance.updateControlVariables(mockArduinoResponses.controlVariables);
      spy.called.should.equal(true);
    });
  });

  describe('handle invalid Arduino data event', function () {
    it('should do something when the invalid data event it fired');

  });

  describe('utilities', function(){
    it('should be able to strip a key from an Arduino response', function(){

      var arduinoString = mockArduinoResponses.temp,
          strippedString = stripKey(arduinoString);
      strippedString.should.equal("{\"BeerTemp\": 40}");
    });
  });

});
