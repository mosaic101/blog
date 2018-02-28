/**
 * TODO 用户表
 * Created by mosaic101 on 2016/7/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema  = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    headImg: { type: String, required: false },
    state: { type: String, default: 'active' },
    location: { type: String, required: false },
    lastLogin: { type: Date, default: Date.now },
    metaTitle: { type: String, required: false },
    metaDesc: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Number, default: Date.now }
    //todo 用户权限类型
    //permission: {
    //    type:Object,
    //    required: false
    //},
    //role: {type: String,required: false, ref: 'Roles'}
});


module.exports = mongoose.model('User', UserSchema);


