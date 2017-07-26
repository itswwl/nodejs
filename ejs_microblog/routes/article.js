/**
 * Created by root on 2017/7/25.
 */
var express = require('express');
var router = express.Router();

var db = require('../database2/db');
var Article = require('../database2/article');


// .route('/article', function(req, res) {
//
//     console.info(req.body + "=======================");
//     // res.render("home");
// })

router.post('/',function(req, res){
    var date = new Date();
    var article = new Article({
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        read:req.body.read,
        createTime:date,
        updateTime:date
    });


    article.save(function (err) {
        if(err){
            res.send(500);
        }else{
            res.send(200);
        }
    });
    console.info(req.body );

});

router.get("/articleList",function (req, res) {
    Article.find({},function (err, docs) {
        console.info(docs);
        if(err){
            res.send(500);
        }else {
            res.render("articleList",{docs:docs});
        }
    });
});

module.exports = router;