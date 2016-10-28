var APIPORT = 8080;

var app = require('express')();
var server = app.listen(APIPORT);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var emitIo = function(report) {
  io.emit('report', report);
}


module.exports = {
  app: app,
  emitIo: emitIo
};
