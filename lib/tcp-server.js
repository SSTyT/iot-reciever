'use strict';

const net = require('net');
const series = require('async/series');
const logger = require('./logger');

const onError = err => {
  if (err) {
    logger.error(err.message);
  }
}

const createServer = (port, formatter) => {
  const server = net.createServer();
  const middleware = [];

  server.on('error', onError);

  server.on('listening', () => {
    const address = server.address();
    logger.info(`TCP Server listening on ${address.address}:${address.port}`);
  });

  server.on('close', () => {
    const address = server.address();
    logger.info(`TCP Server ${address.address}:${address.port} closed`);
  });

  server.on('connection', conn => {
    conn.on('data', data => {
      const formattedMessage = formatter(data);
      const remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
      series(middleware.map(fn => next => fn(formattedMessage, remoteAddress, next)));
      conn.write('ok');
      conn.end();
    });
    conn.on('error', onError);
  });

  server.listen(port);

  return {
    use: fn => {
      middleware.push(fn);
      return this;
    },
    close: () => {
      server.close();
    }
  }
}

module.exports = {
  createServer
};
