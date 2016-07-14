/**
 * Created by mosai on 2016/7/14.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt      = require('bcryptjs');

// 表单，email, password 俩个字段
var AdminUserSchema   = new Schema({
    email: { type:String, required: true},
    password: {type:String,required:true,trim:true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    //用户名
    nickname: {type:String, required: true},
    //性别
    gender: {type:String, required: false},
    portrait: {type:String, required: false},
    thumbnail: {type:String, required: false},
    fans: {type:Number, required: false},
    follow: {type:Number, required: false},
    description: {type:String, required: false},
    created:{type:Date,default:Date.now},
    //用户权限类型
    permission: {type:Object, required: false},
    role: {type: String,required: false, ref: 'Roles'}
});

AdminUserSchema.pre('save', function(next) {
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

AdminUserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
AdminUserSchema.methods.encodePwd = function(pwd, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        //if (err) return next(err);
        bcrypt.hash(pwd, salt, function(err, hash) {
            callback(err, hash);
        });
    });
}
module.exports = mongoose.model('Users', AdminUserSchema);


