var BrewPi = require('../'),
    should = require('should');

describe('brewPi', function(){
  describe('serial port configuration', function(){

    it('should be able to be passed a serial port', function(){
      var testBrewPi = new BrewPi({
        serialPort: '/dev/test/port'
      });

      testBrewPi.serialPort.should.equal('/dev/test/port');
    });

    it('should have a default serial port', function(){
      var testBrewPi = new BrewPi();

      testBrewPi.serialPort.should.equal('/dev/ttyACM0');
    });

  });
});
