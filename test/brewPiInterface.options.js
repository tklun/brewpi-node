var BrewPi = require('../'),
    should = require('chai').should(),
    csrequire = require('covershot').require.bind(null, require),
    BrewPiInterface = csrequire('../lib/interface');

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
