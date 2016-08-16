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
        action.save(function (err, result) {
            if (err) {
                return reject({err:err.errors,message:err.message,status:-99});
            }
            return resolve(result);
        });
    })
};


/**
 * 【查询单个用户】
 * @param conditions {object} 查询条件
 * @param fields     {object} 过滤字段
 * @param options    {object} 其他操作
 */
exports.findOne = (conditions,fields,options) => {
    //return UserModel.findOne(conditions,fields,options).exec();
    return new Promise((resolve,reject) => {
        UserModel.findOne(conditions,fields,options).exec((err, doc) => {
            if (err) return reject({err:err,message:'查询出错！',status:'-99'});
            if (!doc) return reject({err:err,message:'没有此用户！',status:'-99'});
            return resolve(doc);
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



