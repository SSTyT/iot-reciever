var PORT = 9876;

var winston = require('winston');
var dgram = require('dgram');
var Pool = require('pg').Pool;

//Winston logger
var logger = new(winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs.log' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './exceptions.log' })
  ]
});

var onError = function(err) {
  logger.error(err.message);
};

process.on('unhandledRejection', onError);

//Postgresql
var config = {
  host: 'mondiodb.ddns.net',
  port: 5432,
  user: 'postgres',
  password: 'Pass1234',
  database: 'ituran',
};

var pool = new Pool(config);

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
  pool.query(query);
});

server.bind(PORT);
