/**
 * Created by mosaic101 on 2016/7/19.
 */
const Blog = require('../models/blogModel');

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
    return Blog.find(where, offset, limit);
};

/**
 * 【list】
 * @param where {object}
 * @param offset {number}
 * @param limit {number}
 */
exports.list = (where, offset, limit) => {
    return Blog.find(where, offset, limit);
};

/**
 * 【one】
 * @param id {string}   
 */
exports.one = (id) => {
    return Blog.findById(id);
};