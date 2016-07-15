/**
 * Created by mosaic101 on 2016/7/14.
 */
var User = require('../models/userModel');
var jwt = require('jwt-simple');

/**
 * @param user {object}
 */
exports.login = (user) => {
    var user = new User(user);
    return new Promise((resolve, reject) => {
        user.save(function(err,result) {
            if (err) {
                console.error(err);
                return reject({err:err.errors,message:'添加用户失败！',status:-99 });
            }
            //存入token
            var token = jwt.encode(result,'BLOG_APi_LOGIN');
            return resolve(token);
        });
    })
};

/**
 * @param user {object}
 */
exports.update = (callback) => {
    var where = {
        name:'wujianjin'
    };
    var options = {
        slug:'hello'
    };
    User.update(where,options,function(err,result) {
        if (err) {
            callback({err:err,message:'update失败！',state:'-99'});
        }
        callback(null,result);
    });
};