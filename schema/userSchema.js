/**
 * TODO 暂时没用到用户表
 * Created by mosaic101 on 2016/7/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UserSchema  = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true, trim: true},
    headImg: {type: String, required: false},
    state: {type: String, default: 'active'},
    location: {type: String, required: false},
    lastLogin: {type: Date, default: Date.now},
    metaTitle: {type: String, required: false},
    metaDesc: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Number, default: Date.now}
    //TODO 用户权限类型
    //permission: {
    //    type:Object,
    //    required: false
    //},
    //role: {type: String,required: false, ref: 'Roles'}
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
UserSchema.methods.encodePwd = function(pwd, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        //if (err) return next(err);
        bcrypt.hash(pwd, salt, function(err, hash) {
            callback(err, hash);
        });
    });
}

module.exports = mongoose.model('Users', UserSchema);


