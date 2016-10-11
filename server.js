var config = require('./config');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var logger = require('./modules/logger');

server.bind(config.port);
/*
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var logger = require('./modules/logger');
var pool = require('./modules/postgre');
var api = require('./modules/api');
var metrics = require('./modules/metrics');

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

  metrics.getCollection('general').meter('requestsPerSecond').mark();
  metrics.getCollection('general').meter('requestsPerMinute', { rateUnit: 60000 }).mark();

  var report = {
    uaid: data[0],
    encrypt_plate_id: data[1],
    latitude: data[2],
    longitude: data[3],
    loc_time: data[4].trim() + '-3',
    speed: data[5],
    head: data[6],
  }

  metrics.getCollection('reports').meter(report.encrypt_plate_id, { rateUnit: 300000 }).mark();

  var query = `INSERT INTO reports VALUES ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4].trim()}-3','${data[5]}','${data[6]}',(ST_SetSRID(ST_MakePoint(${data[3]},${data[2]}),4326)))`;
  console.log(query);
  pool.query(query, onError);

  //TODO pensar capa middleware, publish/suscriber
  api.emitIo(report);

});

server.bind(PORT);
*/

