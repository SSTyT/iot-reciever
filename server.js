var PORT = 9876;

var winston = require('winston');
var dgram = require('dgram');

var logger = new(winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs.log' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './exceptions.log' })
  ]
});

var server = dgram.createSocket('udp4');
server.on('listening', function() {
  var address = server.address();
  logger.info('UDP Server listening on ' + address.address + ":" + address.port);
});
server.on('message', function(message, remote) {
  logger.info(message.toString());
});
server.bind(PORT);
