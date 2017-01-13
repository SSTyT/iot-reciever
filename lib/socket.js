'use strict';

const express = require('express');

const createSocket = port => {
  const app = express();
  const server = app.listen(port);
  const io = require('socket.io').listen(server);

  return {
    emitIo: report => io.emit('report', report)
  }
}

module.exports = {
  createSocket
};
