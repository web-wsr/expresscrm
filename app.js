// 引入dotenv模块
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
// 引入favicon
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 更换api路由地址
var apiRouter = require('./routes/api');
// 引用 filters
var filters = require('./filters/index');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'tpl');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 引用文件中引用 filters ，要在定义路由之前定义
filters(app)
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
