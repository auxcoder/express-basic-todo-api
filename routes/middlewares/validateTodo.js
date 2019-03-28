function validateTodo(req, res, next) {
  const minlength = 5;
  req.checkBody('title', `Title field min length should be ${minlength}`).isLength({ min: minlength });
  req.checkBody('completed', 'Completed field should be a boolean').isBoolean();

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

module.exports = validateTodo;
