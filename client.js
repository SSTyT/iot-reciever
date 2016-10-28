var moment = require('moment');

var PORT = 9877;
var HOST = 'localhost';

var dgram = require('dgram');
var message = new Buffer(`${Math.ceil(Math.random() * 100000000000)}, 1234567, -34.4757, -58.66363, ${moment().format('YYYY-MM-DD hh:mm:ss')}, 50, 30, 0, `);

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST + ':' + PORT);
  client.close();
});
