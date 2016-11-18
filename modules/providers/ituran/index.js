const config = require(__base + 'providers/ituran/config');

var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var connectionString = 'HostName=ituran-hub.azure-devices.net;DeviceId=ituran-device;SharedAccessKey=+n74yy6TF6h4kEwkHIJp9/H6O/3tuXPdvFJhQS4myyw=';
var ready = false;
var client = clientFromConnectionString(connectionString);


function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

client.open(function() {
  ready = true;
  console.log("connected");
});

var MAX_BUFFER_LENGTH = 255 * 1024; //255kb
var messageBuffer = Buffer.from('');

const middleware = [
  (message, remote, next) => {
    while (!ready) {
      //TODO sacar gronchada
    }

    if (messageBuffer === undefined) {
      messageBuffer = message;
    } else {
      if ((messageBuffer.length + message.length + 1) > MAX_BUFFER_LENGTH) {
        //TODO envio
        console.log('Length: ' + messageBuffer.length);
        console.log('Messages: ' + messageBuffer.toString().split(';').length);
        messageBuffer = message;
      } else {
        messageBuffer = Buffer.concat([messageBuffer, Buffer.from(';'), message]);
      }
    }



    //var message = new Message(JSON.stringify(message));
    //console.log("Sending message: " + message.getData());
    //client.sendEvent(message, printResultFor('send'));
  }
];

module.exports = {
  formatter: message => {
    return message;
    /*const data = message.toString().split(',');

    return {
      id: data[0],
      encrypt_plate_id: data[1],
      latitude: data[2],
      longitude: data[3],
      loc_time: data[4].trim() + '-3',
      speed: data[5],
      head: data[6],
    }*/
  },
  port: config.port,
  middleware
}
