# BrewPi - Node

## Todo

* Define main API

  * Getters
  * Setters
  * Data Logger
  * Program Arduino (AVRDude interface?)


* Evaluate and determine database

* Object structure

var myPi = new BrewPi({

});

// Set single options or send an object
myPi.set('param', val);
myPi.set({
  param: val
});

// Get a single param
myPi.get('param')

// Start or stop the script
myPi.start();
myPi.stop();

//
