var APIPORT = 8080;

var app = require('express')();
var server = app.listen(APIPORT);
var io = require('socket.io').listen(server);

var emitIo = function(report) {
  io.emit('report', report);
}


module.exports = {
  emitIo: emitIo
};
