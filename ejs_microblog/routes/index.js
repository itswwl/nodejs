var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  login */
router.route("/login").get(function (req, res) {
  res.render("login",{title:"login页面"});
}).post(function (req, res) {
  var User = global.dbhandler.getModel('user');
  var username = req.body.username;
  User.findOne({username:username},function (err, doc) {
    if(err){
      res.sendStatus(500);
      console.error(err);
    }else if(!doc){
      req.session.error = "用户不存在";
      req.sendStatus(404);
    }else {
      if(req.body.password != doc.password){
        req.session.error = "密码错误";
        res.sendStatus(404);
      }else{
        req.session.user = doc;
        res.sendStatus(200);
        // throw err;
      }
    }
  });
});

/*  register */
router.route("/register").get(function (req, res) {
  res.render("register");
}).post(function (req, res) {
  var User = global.dbhandler.getModel('user');
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username:username},function (err, doc) {
    if(err){
      res.sendStatus(500);
      req.session.error = "网络错误";
      console.error(err);
    }else if(doc){
      req.session.error = "用户已存在";
      res.sendStatus(500);
    }else {
      User.create({username:username,password:password},function (err, doc) {
        if(err){
          res.sendStatus(500);
          console.info(err);
        }else{
          req.session.error = "用户创建成功";
          res.sendStatus(200);

        }
      });
    }
  });
});

//测试ajax获取数据
router.get("/ajax",function (req, res) {
  // res.sendStatus(200);
  // res.send("ajax获取数据");
  res.json({"name":"wl","age":100,"isM":true,"birthday":new Date()});
});

/*  home */
router.get("/home",function (req, res) {
  if(!req.session.user){
    req.session.error = "请先登录";
    res.redirect("/register");
  }
  res.render("home");
});

/*  logout */
router.get("/logout",function (req, res) {
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
})

module.exports = router;
