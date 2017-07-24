/*
*
*
* Express安装入门与模版引擎ejs
* http://www.cnblogs.com/zhongweiv/p/nodejs_express.html
*
* 快速使用node.js进行web开发
* http://www.cnblogs.com/myzhibie/p/4458584.html
*
* node.js基于express框架搭建一个简单的注册登录Web功能
* http://www.cnblogs.com/Leo_wl/p/4361289.html
*
* Express框架中如何引用ejs模板引擎
* http://www.cnblogs.com/greenteaone/p/3685733.html
*
*
* */




var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
