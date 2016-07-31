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
    return User.save(options);
};

/**
 * 【login】
 * @param user {object}
 */
exports.login = (user) => {
    let md5 = crypto.createHash('md5');
    //let password = md5.update(user.password).digest('hex');
    let conditions = {
        _id:'579dec06dff2a33389a6678b'
    };
    return new Promise((resolve, reject) => {
        User.findOne(conditions).then((result) => {
            //compare password
            //if (result.password != password) {
            //    return reject({err:null,message:'密码错误！',status:'-99'});
            //}
            //存入token
            var token = jwt.encode(result,'BLOG_APi_LOGIN');
            return resolve(token);
        }).catch((err) => {
            return reject(err);
        });
    })
};

/**
 * 【one】
 * @param conditions {object}
 */
exports.one = (conditions) => {
    return new Promise((resolve, reject) => {
        try {
            let result = User.findOne(conditions);
            if (!result) {
                return reject({err:err,message:'没有此用户！',status:'-99'});
            }
            return resolve(result);
        }catch (err) {
            return reject({err:err,message:'查询出错！',status:'-99'});
        }
    })
};