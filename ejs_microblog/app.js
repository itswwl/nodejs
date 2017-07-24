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
 *  bower简明入门教程
 *  https://segmentfault.com/a/1190000002971135
 *
 *  https://segmentfault.com/a/1190000000349555#articleHeader6
 *
 *
 *  ejs learning
 *  http://www.cnblogs.com/stephenykk/p/6017927.html
 *
 *
 *
 *
 *   Node.js开发入门——MongoDB与Mongoose
 *   http://blog.csdn.net/foruok/article/details/47746057
 *
 *
 *    Mongoose介绍和入门
 *    http://www.cnblogs.com/zhongweiv/p/mongoose.html
 *
 *    Mongoose增查改删学习笔记
 *    http://www.jianshu.com/p/2f54b90efe15
 *
 *    NodeJS实战：Express+Mongoose+ejs
 *    http://www.tuicool.com/articles/7Zfieuy
 *
 *    Mongoose使用操作
 *    http://blog.csdn.net/u014267351/article/details/51212107
 *
 *    Mongoose学习参考文档——基础篇
 *    http://cnodejs.org/topic/504b4924e2b84515770103dd
 *
 *
 *
 *  webstorm调试node（express 框架）
 *  http://cnodejs.org/topic/571605522de81867132a793f
 *
 *
 *
 *  mongoose 连接警告问题(node:148572) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0
 *  http://blog.csdn.net/yingzizizizizizzz/article/details/74942107
 *
 *  express-session deprecated undefined resave option; provide resave option app.js
 *  http://blog.csdn.net/testcs_dn/article/details/54236445
 *
 *  求助! req.session
 *  http://cnodejs.org/topic/530c9b49d3cc5cd77d043b2a
 *
 *  node+express在前台接收后台传出的session值
 *  http://blog.csdn.net/u013708407/article/details/50041141
 *
 *
 *  Node出错崩溃了怎么办
 *  http://www.oschina.net/question/433035_171960
 *
 *
 * */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer = require("multer");
var mongoose = require("mongoose");
var session = require("express-session");


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

global.dbhandler = require("./database/dbhandler");
global.db = mongoose.connect("mongodb://127.0.0.1/node",{useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session插件
app.use(session({
  secret:"secret",
  cookie:{
    maxAge:1000*60*60,
    secure: false
  }
  ,
  resave: false,
  saveUninitialized: true
  ,
  // store: new MongoStore({
  //   db: "node",
  //   host: "localhost",
  //   port: 27017
  // })
}));

//session中存取值
app.use(function(req, res, next) {

  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();

});






app.use('/', index);
app.use('/users', users);
app.use('/login', index);
app.use('/register', index);
app.use('/home', index);
app.use('/ajax', index);
app.use('/logout', index);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
//
// });




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // next();
});

//全局捕获异常，否则node单线程，异常整个程序退出
process.on("uncaughtException",function (err) {
  console.info("=====================");
  console.error(err + "+++++++++++++++++++");
  console.error(err.stack);
  console.info("=====================");
});

module.exports = app;
