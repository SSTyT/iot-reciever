'use strict';

const config = require('./lib/config');
const udp = require('./lib/udp-server');
const providers = require('./lib/providers');

(provider => {
  const server = udp.createServer(provider.port, provider.formatter);
  provider.middleware.forEach(middleware => server.use(middleware));
})(providers.ituran);
