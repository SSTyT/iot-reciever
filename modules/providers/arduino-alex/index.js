const config = require(__base + 'providers/arduino-alex/config');

const middleware = [
  (message, remote, next) => {
    console.log(message);
  }
];

module.exports = {
  formatter: message => {
    return message.toString(); //TODO
  },
  port: config.port,
  middleware
}
