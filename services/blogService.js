/**
 * Created by mosaic101 on 2016/7/19.
 */
const Blog = require('../models/blogModel');
/**
 * 【add】
 * @param blog {object}
 */
exports.add = (blog) => {
    var blog = new Blog(blog);
    return new Promise((resolve, reject) => {
        blog.save(function(err,result) {
            if (err) {
                console.error(err);
                return reject({err:err.errors,message:err.message,status:-99 });
            }
            return resolve(result);
        });
    })
};