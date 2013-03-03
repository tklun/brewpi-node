var BrewPi = require('../'),
    should = require('chai').should(),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    BrewPiInterface = require('../lib/interface'),
    stripKey = require('../lib/interface').stripKey;

describe('brewPiInterface', function(){
  describe('utilities', function(){
    it('should be able to strip a key from an Arduino response', function(){
      var arduinoString = "T:{\"BeerTemp\": 40",
          strippedString = stripKey(arduinoString);
      strippedString.should.equal("{\"BeerTemp\": 40");
    });
  });

  describe('event emitters', function() {

    it('should emit an event when LCD is updated', function() {
      var spy = sinon.spy();

      var testBrewPiInterfaceInstance = new BrewPiInterface({
        brewPi: new BrewPi()
      });

      testBrewPiInterfaceInstance.brewPi.on('newLCDData', spy);

      testBrewPiInterfaceInstance.updateLCD('someDataString');
      spy.called.should.equal(true);
    });



  });


});
