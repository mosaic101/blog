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
 * 【list】
 * @param conditions {object}
 * @param fields {object}
 * @param options {object}
 */
exports.list = (conditions, fields, options) => {
    return Blog.find(conditions, fields, options);
};