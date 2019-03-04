var createError = require('http-errors');

module.exports = function(req, res, next) {
  function requireBodyAttr(method) {
    return ['PATCH', 'PUT', 'POST'].indexOf(method) !== -1;
  }

  if (requireBodyAttr(req.method) && Object.keys(req.body).length === 0) {
    next(createError(400, `Invalid request, method ${req.method} requires attributes in body`));
  }
  next();
};
