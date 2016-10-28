var config = require('../config.json');
var logger = require('./logger');

var Pool = require('pg').Pool;

config.db.poolLog = function(log, level) {
  if (level === 'error') {
    logger.error(log);
  } else if (level === 'warn') {
    logger.warn(log);
  }
}

module.exports = new Pool(config.db);
