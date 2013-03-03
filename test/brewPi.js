var BrewPi = require('../'),
    should = require('should');

describe('brewPi', function(){
  describe('instantiation', function(){

    it('should create a new instance when called directly', function(){
      var brewPiCalledDirectly = BrewPi();

      (brewPiCalledDirectly instanceof BrewPi).should.equal(true);
    });

    // it('should have a default serial port', function(){
    //   var testBrewPi = new BrewPi({});

    //   testBrewPi.serialPort.should.equal('/dev/ttyACM0');
    // });
  });

  describe('create', function() {

    beforeEach(function(){
      var testBrewPiInstance = new BrewPi();
    });

    it('should have a reference to it\'s parent context');


  });
});
