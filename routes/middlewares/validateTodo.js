function validateTodo(req, res, next) {
  req.checkBody('title', 'Title field min length should be 5').isLength({ min: 3 });
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
