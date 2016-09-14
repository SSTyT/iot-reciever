var PORT = 9876;

var winston = require('winston');
var dgram = require('dgram');
var Pool = require('pg').Pool;

var config = require('./config.json');

//Winston logger
var logger = new(winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: config.logs.console })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: config.logs.exception })
  ]
});

var onError = function(err) {
  if (err) {
    logger.error(err.message);
  }
};

//Postgresql
var dbConfig = config.db;

dbConfig.poolLog = function(log, level) {
  if (level === 'error') {
    logger.error(log);
  } else if (level === 'warn') {
    logger.warn(log);
  }
}

var pool = new Pool(config.db);
pool.on('error', onError);

//UDP receive
var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
  logger.info('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
  var data = message.toString().split(',');
  var query = `INSERT INTO reports VALUES ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4].trim()}-3','${data[5]}','${data[6]}',(ST_SetSRID(ST_MakePoint(${data[3]},${data[2]}),4326)))`;
  console.log(query);
  pool.query(query, onError);
});

server.bind(PORT);
