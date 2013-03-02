

var BrewPiInterface = function(options) {

  this.brewPi = options.brewPi;

  this.create();
};

BrewPiInterface.prototype.create = function() {

  this.on('ardTemp', function(tempData) {

  });

  this.on('ardDebug', function(debugData) {

  });

  this.on('ardLCD', function(lcdData) {

  });

  this.on('ardCC', function(ccData) {

  });

  this.on('ardCS', function(csData) {

  });

  this.on('ardCV', function(cvData) {

  });

  this.on('ardInvalid', function(invalidData) {

  });

};





/**
 * Expose constructor.
 */

exports = module.exports = BrewPiInterface;
