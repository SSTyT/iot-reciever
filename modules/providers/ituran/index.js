const config = require(__base + 'providers/ituran/config');

const middleware = [
  (message, remote, next) => {
    console.log(message);
  }
];

module.exports = {
  formatter: message => {
    const data = message.toString().split(',');

    return {
      uaid: data[0],
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
