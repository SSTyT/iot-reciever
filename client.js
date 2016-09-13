var PORT = 9876;
var HOST = 'sstyt.ddns.net';

var dgram = require('dgram');
var message = new Buffer('99999999999,2128876,-34.4757,-58.66363,2016-08-26 09:10:44 ,0,30,0,');

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});