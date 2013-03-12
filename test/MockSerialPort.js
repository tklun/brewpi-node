var util = require('util'),
    events = require('events');

var MockSerialPort = function(path){
  var self = this;
  this.isClosed = false;
  process.nextTick(function () {
    self.open();
  });
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
};

module.exports.SerialPort = MockSerialPort;
