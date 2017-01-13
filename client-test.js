'use strict';

const dgram = require('dgram');
const moment = require('moment');

const PORT = 9876;
const HOST = 'localhost';

const client = dgram.createSocket('udp4');
const message = new Buffer(`${Math.ceil(Math.random() * 100000000000)}, 1234567, -34.4757, -58.66363, ${moment().format('YYYY-MM-DD hh:mm:ss')}, 50, 30, 0, `);

client.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
  if (err) throw err;
  console.log(message.toString());
  console.log(`UDP message sent to ${HOST}:${PORT}`);
  client.close();
});
