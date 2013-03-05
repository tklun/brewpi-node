var BrewPi = require('../'),
    should = require('chai').should(),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    csrequire = require('covershot').require.bind(null, require),
    BrewPiInterface = csrequire('../lib/interface'),
    stripKey = csrequire('../lib/interface').stripKey;

describe('brewPiInterface', function(){
  var testBrewPiInterfaceInstance;

  beforeEach(function(){
    testBrewPiInterfaceInstance = new BrewPiInterface({
      brewPi: new BrewPi()
    });
  });

  describe('utilities', function(){
    it('should be able to strip a key from an Arduino response', function(){
      // var testBrewPiInterfaceInstance = new BrewPiInterface({
      //   brewPi: new BrewPi()
      // });

      var arduinoString = "T:{\"BeerTemp\": 40",
          strippedString = stripKey(arduinoString);
      strippedString.should.equal("{\"BeerTemp\": 40");
    });
  });

  describe('update temperature', function() {
    it('should emit an event after the temperature is stored', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('newTemperatureData', spy);

      testBrewPiInterfaceInstance.storeNewTemperatures('T:{"stubbed": "settings"}');
      spy.called.should.equal(true);
    });
  });

  describe('update LCD', function() {

    it('should emit an event when LCD is updated', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('newLCDData', spy);

      testBrewPiInterfaceInstance.updateLCD('someDataString');
      spy.called.should.equal(true);
    });

    it('should do something with the LCD data');

  });

  describe('update control constants', function () {
    it('should update control constants');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlConstantsUpdated', spy);

      testBrewPiInterfaceInstance.updateControlConstants('C:{"stubbed": "constants"}');
      spy.called.should.equal(true);
    });
  });

  describe('update control settings', function () {
    it('should update control settings');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlSettingsUpdated', spy);

      testBrewPiInterfaceInstance.updateControlSettings('S:{"stubbed": "settings"}');
      spy.called.should.equal(true);
    });
  });

  describe('update control variables', function () {
    it('should update control variables');

    it('should emit an event when update is complete', function() {
      var spy = sinon.spy();

      testBrewPiInterfaceInstance.brewPi.on('controlVariablesUpdated', spy);

      testBrewPiInterfaceInstance.updateControlVariables('V:{"stubbed": "constants"}');
      spy.called.should.equal(true);
    });
  });

});
