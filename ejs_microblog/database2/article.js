/**
 * Created by root on 2017/7/25.
 */
var mongoose=require('./db').mongoose;
var schema=new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    read:Number
});
var Article=mongoose.model('Article',schema);
module.exports=Article;