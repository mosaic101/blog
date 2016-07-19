/**
 * Created by mosaic101 on 2016/7/14.
 */
const UserSchema = require('../schema/userSchema');

var User = function(opt) {
    this.opt = opt;
};

/**
 * 【添加用户】
 * @param callback {function}
 */
User.prototype.save = function (callback) {
    var action = new UserSchema(this.opt);
    action.save(callback);
};


/**
 * 【查询单个用户】
 * @param conditions {object}
 */
User.findOne = (conditions) => {
    return new Promise((resolve,reject) => {
        UserSchema.findOne(conditions).exec((err, doc) => {
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
User.update = (where, options, callback) => {
    UserSchema.update(where, options,{multi: true},(err, numberAffected, raw) => {
        if(err) {
            return callback(err);
        }
        callback(null, numberAffected);

    })
};




export default User;