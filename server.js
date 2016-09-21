var PORT = 9876;

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var logger = require('./modules/logger');
var pool = require('./modules/postgre');
var api = require('./modules/api');

var onError = function(err) {
  if (err) {
    logger.error(err.message);
  }
};

pool.on('error', onError);

server.on('listening', function() {
  var address = server.address();
  logger.info('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
  var data = message.toString().split(',');
  var query = `INSERT INTO reports VALUES ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4].trim()}-3','${data[5]}','${data[6]}',(ST_SetSRID(ST_MakePoint(${data[3]},${data[2]}),4326)))`;
  console.log(query);
  pool.query(query, onError);
  api.emitIo(data);
});

server.bind(PORT);
