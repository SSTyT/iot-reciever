'use strict';

global.__base = __dirname + '/modules/';

const config = require('./config');
const udp = require(__base + 'udp-server');
const providers = require(__base + 'providers');

providers.forEach(provider => {
  const server = udp.createServer(provider.port, provider.formatter);

  server.use(function(message, remote, next) {
    console.log("asd3 " + JSON.stringify(message));
    next();
  })
});
