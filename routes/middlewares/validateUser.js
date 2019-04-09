const minUsername = 8;
const minPass = 8;

function ifErrors(errors, res) {
  var response = { errors: [] };
  errors.forEach(function(err) {
    response.errors.push(err.msg);
  });
  res.statusCode = 400;
  return res.json(response);
}

module.exports.newUser = function newUser(req, res, next) {
  req.checkBody('username', `Username field min length should be ${minUsername}`).isLength({ min: minUsername });
  // todo: set password security rules
  req.checkBody('password', `Password field min length should be ${minPass}`).isLength({ min: minPass });
  req.checkBody('email', `Email field not valid`).isEmail();

  var errors = req.validationErrors();
  if (errors) ifErrors(errors, res);
  return next();
};

module.exports.patchUser = function patchUser(req, res, next) {
  req.checkBody('username', `Username field min length should be ${minUsername}`).isLength({ min: minUsername });
  req.checkBody('email', `Email field not valid`).isEmail();

  var errors = req.validationErrors();
  if (errors) ifErrors(errors, res);
  return next();
};

module.exports.existUser = function existUser(req, res, next) {
  req.checkParams('email', `Email field not valid`).isEmail();

  var errors = req.validationErrors();
  if (errors) ifErrors(errors, res);
  return next();
};
