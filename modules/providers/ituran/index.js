const config = require(__base + 'providers/ituran/config');
//const documentDb = require(__base + 'azure/document-db'); //TODO reubicar
//var azure = require('azure-storage');

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

const middleware = [
  (message, remote, next) => {
    //console.log(message);
    next();
  },
  (message, remote, next) => {
    while (!ready) {
      //TODO sacar gronchada
    }

    var message = new Message(JSON.stringify(message));
    console.log("Sending message: " + message.getData());
    client.sendEvent(message, printResultFor('send'));
  }
  /*(message, remote, next) => {
    var queueSvc = azure.createQueueService('ituranstorage', 'G/qeuOV+cd+mYHXnQX6FyQ767q+nKyZpmy/NBLTibC8wHgIv353bEpbkFxmcye+ybaC2kDHs8XfliK9RzaAkkQ==');

    queueSvc.createQueueIfNotExists('ituranqueue', function(error, result, response) {
      if (!error) {
        queueSvc.createMessage('ituranqueue', JSON.stringify(message), function(error) {
          if (!error) {
            console.log('creado');
          } else {
            console.log(error);
          }
        });
      }
    });
  }
  (message, remote, next) => {
    const connection = documentDb.connect(config.documentDb.host, config.documentDb.key);
    connection.getOrCreateDatabase('iturandb', (err, db) => {
      if (err) {
        console.log(err); //TODO logear posta
      } else {
        connection.getOrCreateCollection(db._self, 'reportes', (err, collection) => {
          if (err) {
            console.log(err); //TODO logear posta
          } else {
            connection.client.createDocument(collection._self, message, (err, document) => {
              if (err) {
                console.log(err); //TODO logear posta
              } else {
                console.log('Created Document with content: ', document);
              }
            });
          }
        });
      }
    });
  }*/ //document db
];

module.exports = {
  formatter: message => {
    const data = message.toString().split(',');

    return {
      id: data[0],
      encrypt_plate_id: data[1],
      latitude: data[2],
      longitude: data[3],
      loc_time: data[4].trim() + '-3',
      speed: data[5],
      head: data[6],
    }
  },
  port: config.port,
  middleware
}
