var createError = require('http-errors');

module.exports = function(req, res, next) {
  next(createError(404, 'route not found'));
};
