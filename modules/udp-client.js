const dgram = require('dgram');
const logger = require(__base + 'logger');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Some bytes');

client.send(message, 41234, 'localhost', err => {
	client.close();
});
