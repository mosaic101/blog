/**
 * Created by mosaic101 on 2016/7/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BlogSchema  = new Schema({
    //TODO 模拟mysql自增id
    f_id: {type: Number, required: true},
    //title
    title: {type: String, required: true},
    //别名
    slug: {type: String, required: true},
    //文章内容
    markdown: {type: String, required: true},
    //TODO
    html: {type: String, required: false},
    //状态
    state: {type: String, default: 'published'},
    //阅读量
    readCount: {type: Number, default: 0},
    //置顶 0:不置顶 1:置顶
    top: {type: Number, default: 0},
    //meta
    metaTitle: {type: String, required: false},
    //meta
    metaDesc: {type: String, required: false},
    //创建时间
    createdAt: {type: Date, default: Date.now},
    //创建人
    createdBy: {type: String, required: true, ref: 'Users'},
    //修改时间
    updatedAt: {type: Number, default: Date.now},
    //修改人
    updatedBy: {type: String, required: true, ref: 'Users'}
});

module.exports = mongoose.model('Blogs', BlogSchema);


