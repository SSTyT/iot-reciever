'use strict';

const config = require('./config');
const socket = require('../../socket').createSocket(config.outboundPort);

const middleware = [
  (message, remote, next) => {
    socket.emitIo(JSON.stringify(message));
  }
];

module.exports = {
  formatter: message => {
    const data = message.toString().split(',');

    return {
      id: data[0],
      encrypt_plate_id: data[1],
      latitude: data[2],
      longitude: data[3],
      loc_time: data[4].trim() + '-3',
      speed: data[5],
      head: data[6],
    }
  },
  port: config.inboundPort,
  middleware
}
