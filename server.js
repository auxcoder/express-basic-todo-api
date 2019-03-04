var express = require('express');
var bodyParser = require('body-parser');
const apiRoutes = require('./routes');
const validateReqBody = require('./middlewares/validateReqBody');
const catchRoute = require('./middlewares/catchRoute');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

// catch post/put/patch without req.body attr
app.use(validateReqBody);

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(catchRoute);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: true, data: { message: err.message } });
});

app.listen(port, function() {
  console.log('Express listening on port', port);
});
