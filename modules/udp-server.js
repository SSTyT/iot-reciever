const dgram = require('dgram');
const series = require('async/series');
const logger = require('./logger');

const onError = err => {
  if (err) {
    logger.error(err.message);
  }
}

const createServer = (port, formatter) => {
  const server = dgram.createSocket('udp4');
  const middleware = [];

  server.on('error', onError);

  server.on('listening', () => {
    const address = server.address();
    logger.info(`UDP Server listening on ${address.address}:${address.port}`);
  });

  server.on('close', () => {
    const address = server.address();
    logger.info(`UDP Server ${address.address}:${address.port} closed`);
  });

  server.on('message', (message, remote) => {
    const formattedMessage = formatter(message);
    series(middleware.map(fn => next => fn(formattedMessage, remote, next)));
  });

  server.bind(port);

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
  createServer: createServer
};
