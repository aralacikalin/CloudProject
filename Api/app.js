var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authorize =require("./_helpers/authorize");
var Role =require("./_helpers/role");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var donwloadRouter = require('./routes/download');
var uploadRouter = require('./routes/upload');
var contentRouter = require('./routes/content');
var userInfoRouter = require('./routes/userinfo');
var authentication = require('./Autherization/users.controller');
var checkAuth = require('./routes/checkAuth');
var logoutRouter = require('./routes/logout');
var ipRouter = require('./routes/ip');

var app = express();
var cors=require("cors")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/cloudcontents",authorize(Role.Admin),express.static("./CloudContents"))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/download', donwloadRouter);
app.use('/upload', uploadRouter);
app.use('/content', contentRouter);
app.use('/userinfo', userInfoRouter);
app.use('/checkauth', checkAuth);
app.use('/logout', logoutRouter);
app.use('/ip', ipRouter);

app.use('/login', authentication);


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
