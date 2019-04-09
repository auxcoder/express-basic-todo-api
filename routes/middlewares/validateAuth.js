const { header, body } = require('express-validator/check');

module.exports.hasAuthToken = function hasAuthToken(req, res, next) {
  header('authorization', `Authorization header required`).isString();
  header('authorization', `Authorization header malformed`).isBase64();

  var errors = req.validationErrors();
  if (errors) ifErrors(errors, res);
  return next();
};

module.exports.verifyEmail = function hasAuthToken(req, res, next) {
  body('token', 'Verification token is required').isString();

  var errors = req.validationErrors();
  if (errors) ifErrors(errors, res);
  return next();
};
