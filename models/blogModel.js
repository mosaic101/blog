/**
 * Created by mosaic101 on 2016/7/19.
 */
const blogSchema = require('../schema/blogSchema');

var Blog = function(opt) {
    this.opt = opt;
};

/**
 * 【添加用户】
 * @param callback {function}
 */
Blog.prototype.save = function (callback) {
    var action = new blogSchema(this.opt);
    action.save(callback);
};




export default Blog;