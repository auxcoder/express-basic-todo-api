function validateUser(req, res, next) {
  const minLenght = 8;
  req.checkBody('username', `Title field min length should be ${minLenght}`).isLength({ min: minLenght });
  // todo: set password security rules
  req.checkBody('password', `Password field min length should be ${minLenght}`).isLength({ min: minLenght });
  req.checkBody('email', `Email field not valid`).isEmail();

  var errors = req.validationErrors();
  if (errors) {
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  return next();
}

module.exports = validateUser;
