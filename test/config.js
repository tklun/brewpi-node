var brewPi = require('../');

describe('brewPi', function(){
  describe('configuration', function(){
    it('should contain a path to a serial port', function(done){

      if (config.serialPort.length > 0 ) {
        return true;
      } else {
        return false;
      }



    });
  });
});
