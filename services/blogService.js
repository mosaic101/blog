/**
 * Created by mosaic101 on 2016/7/19.
 */
const models  = require('../models');
const Blog    = models.Blog;

const IMG_URL = 'images/background.jpg';

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
exports.list = (where, offset, limit) => {
    return new Promise((resolve,reject) => {
        Blog.count(where, (err, count) => {
            console.info(1,count)
            if(err) {
                return reject(Error('获取博客数量失败!'));
            }
            Blog.find(where)
                .sort({createdAt : -1})
                .skip(offset)
                .limit(limit).exec((err, docs) => {
                if(err) {
                    return reject(Error('查询博客失败!'));
                }
                console.info(2,docs)
                return resolve({
                    count: count,
                    rows: docs
                });
            });
        });
    });
};

/**
 * 【one】
 * @param id {string}   
 */
exports.one = (id) => {
    return Blog.findById(id);
};