var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studios = require('./routes/studios');
var blogs = require('./routes/blogs');
var bookings = require('./routes/bookings');

var app = express();

//DB connection
mongoose.connect('mongodb://localhost/blog')
  .then(() =>  console.log('DB Connection successfull'))
  .catch((err) => console.error(err));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/studios', studios);
app.use('/blogs', blogs);
app.use('/bookings', bookings);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
