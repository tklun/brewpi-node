var util = require('util'),
    events = require('events');

var MockSerialPort = function(path){
  this.isClosed = false;
  this.open();
};

util.inherits(MockSerialPort,events.EventEmitter);

MockSerialPort.prototype.write = function(buffer){
  this.lastWrite = buffer;
};

MockSerialPort.prototype.close = function(){
  this.isClosed = true;
};

MockSerialPort.prototype.open = function(){
  this.emit('open');
  console.log('open');
};

module.exports.SerialPort = MockSerialPort;
