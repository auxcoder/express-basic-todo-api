'use strict';

var winston = require('winston');

const baseTransportConfig = {
  json: true,
  maxFiles: 5,
  colorize: false,
  handleExceptions: true
};

var logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.json(),
  transports: [
    new winston.transports.File(
      Object.assign({}, baseTransportConfig, {
        maxsize: 5242880, //5MB,
        level: 'error',
        filename: './logs/error.log'
      })
    ),
    new winston.transports.File(
      Object.assign({}, baseTransportConfig, {
        maxsize: 5242880, //5MB
        level: 'debug',
        filename: './logs/all-logs.log'
      })
    )
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  );
}

console.log = (...args) => logger.info.call(logger, ...args);
console.info = (...args) => logger.info.call(logger, ...args);
console.warn = (...args) => logger.warn.call(logger, ...args);
console.error = (...args) => logger.error.call(logger, ...args);
console.debug = (...args) => logger.debug.call(logger, ...args);

module.exports = logger;
