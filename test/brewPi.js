var BrewPi = require('../'),
    should = require('chai').should();

describe('brewPi', function(){
  describe('instantiation', function(){

    it('should create a new instance when called directly', function(){
      var brewPiCalledDirectly = BrewPi();

      (brewPiCalledDirectly instanceof BrewPi).should.equal(true);
    });

  });

  describe('create', function() {

    beforeEach(function(){
      var testBrewPiInstance = new BrewPi();
    });

    it('should have a reference to it\'s parent context');


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

});
