/**
 * Created by mosaic101 on 2016/7/19.
 */
const Promise = require('bluebird');
const blogModel = require('../schema/blogSchema');

/**
 * 【添加blog】
 * @param blog {object}
 */
exports.save = function (blog) {
    var action = new blogModel(blog);
    return new Promise((resolve, reject) => {
        action.save(function (err, result) {
            if (err) {
                return reject({err:err.errors,message:err.message,status:-99 });
            }
            return resolve(result);
        });
    })
};

/**
 * 【根据id查询单个blog】
 * @param id {object} id
 */
exports.findById = function (id) {
    //exec 返回promise实例
    return blogModel.findById(id).exec();

};

/**
 * 【查询单个blog】
 * @param id {object} id
 */
exports.findOne = function (where) {
    //exec 返回promise实例
    return blogModel.findOne(where).exec();

};

/**
 * 【查询所有blog】
 * @param conditions {object} 查询条件
 * @param fields     {object} 过滤字段
 * @param options    {object} 其他操作
 */
exports.findAll = function (conditions, fields, options) {
    //exec 返回promise实例
    //return blogModel.find(conditions, fields, options).exec();
    //TODO　error handle
    //var promise = Model.find().exec();
    //promise.then(
    //    function(result) {
    //        // on resolve
    //    },
    //    function(err) {
    //        // on reject
    //    }
    //);
};

/**
 *【查询所有blog】
 * @param where
 * @param offset
 * @param limit
 * @returns {Array|{index: number, input: string}}
 */
exports.find = function (where, offset, limit) {
    return blogModel.find(where)
        .sort({createdAt : -1})
        .skip(offset)
        .limit(limit)
        .exec();
    //另外的写法 exec 返回promise实例
    //return blogModel.find(conditions, fields, options).exec();
};
