/**
 * Created by mosaic101 on 2016/7/14.
 */
const jwt = require('jwt-simple');
const crypto = require('crypto');
const User = require('../models/userModel');

/**
 * 【register】
 * @param options {object}
 */
exports.register = (options) => {
    var user = new User(options);
    return new Promise((resolve, reject) => {
        user.save(function(err,result) {
            if (err) {
                console.error(err);
                return reject({err:err.errors,message:err.message,status:-99 });
            }
            return resolve(result);
        });
    })
};

/**
 * 【login】
 * @param user {object}
 */
exports.login = (user) => {
    let md5 = crypto.createHash('md5');
    let password = md5.update(user.password).digest('hex');
    let conditions = {
        name: user.name
    };
    return new Promise((resolve, reject) => {
        User.findOne(conditions).then((result) => {
            //compare password
            if (result.password != password) {
                return reject({err:null,message:'密码错误！',status:'-99'});
            }
            //存入token
            var token = jwt.encode(result,'BLOG_APi_LOGIN');
            return resolve(token);
        }).catch((err) => {
            return reject(err);
        }) ;
    })
};

/**
 * 【one】
 * @param id {object}
 */
exports.one = (id) => {
    let conditions = {
        _id: id
    };
    return new Promise((resolve, reject) => {
        User.findOne(conditions).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        }) ;
    })
};