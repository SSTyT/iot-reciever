const config = require(__base + 'providers/arduino-alex/config');

module.exports = {
  formatter: message => {
    return message; //TODO
  },
  port: config.port
}
