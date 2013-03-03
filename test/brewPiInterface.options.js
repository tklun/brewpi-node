var BrewPi = require('../'),
    should = require('chai').should(),
    BrewPiInterface = require('../lib/interface');

describe('brewPiInterface', function(){
  describe('instantiation', function(){

    it('should be take a BrewPi instance as an option', function() {
      var testBrewPiInstance = new BrewPi();
      var testBrewPiInterfaceInstance = new BrewPiInterface({
        brewPi: testBrewPiInstance
      });

      testBrewPiInterfaceInstance.brewPi.should.equal(testBrewPiInstance);
    });




  });

});
