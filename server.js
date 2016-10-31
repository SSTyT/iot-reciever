'use strict';

global.__base = __dirname + '/modules/';

const config = require('./config');
const udp = require(__base + 'udp-server');
const tcp = require(__base + 'tcp-server');
const providers = require(__base + 'providers');

providers.forEach(provider => {
  const server = tcp.createServer(provider.port, (message) => 'tcp: ' + provider.formatter(message));
  provider.middleware.forEach(middleware => server.use(middleware));
});

providers.forEach(provider => {
  const server = udp.createServer(provider.port, (message) => 'udp: ' + provider.formatter(message));
  provider.middleware.forEach(middleware => server.use(middleware));
});
