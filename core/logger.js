'use strict';

var winston = require('winston');

const baseTransportConfig = {
  maxFiles: 5,
  colorize: false,
  handleExceptions: true,
  format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
};

var logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.File(
      Object.assign({}, baseTransportConfig, {
        json: true,
        maxsize: 5242880, //5MB,
        level: 'error',
        filename: './logs/error-logs.log',
      })
    ),
    new winston.transports.File(
      Object.assign({}, baseTransportConfig, {
        json: false,
        maxsize: 5242880, //5MB
        level: 'debug',
        filename: './logs/all-logs.log',
      })
    ),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      // format: winston.format.simple(),
      format: winston.format.combine(winston.format.splat(), winston.format.simple()),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    })
  );
}

console.log = (...args) => logger.info.call(logger, ...args);
console.info = (...args) => logger.info.call(logger, ...args);
console.warn = (...args) => logger.warn.call(logger, ...args);
console.error = (...args) => logger.error.call(logger, ...args);
console.debug = (...args) => logger.debug.call(logger, ...args);

module.exports = logger;
