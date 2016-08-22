/**
 * Created by mosaic101 on 2016/7/14.
 */
const Promise = require('bluebird');
const UserModel = require('../schema/UserSchema');

/**
 * 【添加用户】
 * @param user {object}
 */
exports.save = function (user) {
    var action = new UserModel(user);
    return new Promise((resolve, reject) => {
        action.save((err, result) => {
            if (err) {
                return reject({message:'添加用户失败', err:err, status:-99});
            }
            return resolve(result);
        });
    })
};


/**
 * 【查询单个用户】
 * @param where {object} 查询条件
 */
exports.findOne = (where) => {
    return new Promise((resolve,reject) => {
        UserModel.findOne(where).exec((err, result) => {
            if (err)
                return reject({message:'查询出错！', err:err, status:-99});
            if (!result)
                return reject({message:'没有此用户！', err:err, status:-99});
            return resolve(result);
        });
    });

};

/**
 * 【修改用户信息】
 * @param where {object}
 * @param options {object}
 * @param callback {function}
 */
exports.update = (where, options, callback) => {
    UserModel.update(where, options,{multi: true},(err, numberAffected, raw) => {
        if(err) {
            return callback(err);
        }
        callback(null, numberAffected);
    })
};



