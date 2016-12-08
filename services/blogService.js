/**
 * Created by mosaic101 on 2016/7/19.
 */
const _ = require('lodash');
const moment = require('moment');
const {markdown} = require('markdown');
const Blog = require('../models/blog');

/**
 * 【add】
 * @param blog {object}
 */
exports.add = (blog) => {
    return Blog.save(blog);
};

/**
 * 【commend】
 * @param where {object}
 * @param offset {number}
 * @param limit {number}
 */
exports.commend = (where, offset, limit) => {
    return Blog.findAll(where, offset, limit);
};

/**
 * 【list】
 * @param where {object}
 * @param offset {number}
 * @param limit {number}
 */
exports.list = async (where, offset, limit) => {
    let data =  await Blog.findAll(where, offset, limit);
    _.forEach(data,(value,key) => {
        value.html = value.html.split('\n')[0]; //TODO 截取第一部分
        value.createdAt = moment(value.createdAt).format('YYYY-MM-DD HH:mm');
    });
    return data;
};

/**
 * 【one】
 * @param id {string}   
 */
exports.one = (id) => {
    return Blog.findById(id);
};