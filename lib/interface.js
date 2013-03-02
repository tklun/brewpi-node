

var BrewPiInterface = function(options) {

  this.brewPi = options.brewPi;

  this.create();
};

BrewPiInterface.prototype.create = function() {

  this.brewPi.on('ardTemp', function(tempData) {

  });

  this.brewPi.on('ardDebug', function(debugData) {

  });

  this.brewPi.on('ardLCD', function(lcdData) {

  });

  this.brewPi.on('ardCC', function(ccData) {

  });

  this.brewPi.on('ardCS', function(csData) {
    console.log(csData);
  });

  this.brewPi.on('ardCV', function(cvData) {

  });

  this.brewPi.on('ardInvalid', function(invalidData) {

  });

};





/**
 * Expose constructor.
 */

exports = module.exports = BrewPiInterface;
