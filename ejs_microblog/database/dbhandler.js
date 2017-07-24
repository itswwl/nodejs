var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require("./models");

for(var model in models){
    mongoose.model(model,new Schema(models[model]));
}

var _getModel = function (type) {
     return mongoose.model(type);
}

module.exports = {
    getModel : function (type) {
        return _getModel(type);
    }
};