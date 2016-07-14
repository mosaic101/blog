/**
 * Created by mosaic101 on 2016/7/14.
 */
var User = require("../models/userModel");
var jwt = require("jwt-simple");

/**
 * @param user {object}
 * @param callback {function}
 */
exports.login = (user,callback) => {
    "use strict";
    var user = new User(user);
    user.save(function(err,result) {
        if (err) {
            callback({err:err,msg:"save ß∞‹£°",state:"-99"});
        }
        //¥Ê»Îtoken
        var token = jwt.encode(result,"BLOG_APi_LOGIN");
        callback(null,token);
    });
};

/**
 * @param user {object}
 * @param callback {function}
 */
exports.update = (callback) => {
    "use strict";
    var where = {
        name:"wujianjin"
    };
    var options = {
        slug:"hello"
    };
    User.update(where,options,function(err,result) {
        if (err) {
            callback({err:err,msg:"update ß∞‹£°",state:"-99"});
        }
        callback(null,result);
    });
};