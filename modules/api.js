var APIPORT = 8080;

var app = require('express')();
var server = app.listen(APIPORT);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var emitIo = function(data) {
  var report = {
    uaid: data[0],
    encrypt_plate_id: data[1],
    latitude: data[2],
    longitude: data[3],
    loc_time: data[4].trim() + '-3',
    speed: data[5],
    head: data[6],
  }

  io.emit('report', report);
}


module.exports = {
  app: app,
  emitIo: emitIo
};
