/**
 * Created by mosaic101 on 2016/7/19.
 */
const Promise = require('bluebird');
const {Blog} = require('../schema/index');

/**
 * 【添加blog】
 * @param options {object}
 */
exports.save = function (options) {
    var action = new Blog(options);
    return new Promise((resolve, reject) => {
        //添加fid
        Blog.find().sort({fid:-1}).limit(1).exec((err, doc) => {
            if(err) {
                return reject({message:'查询fid失败！', err:err, status:-99});
            }
            if(doc && doc.length>0 && typeof doc[0].fid=='number') {
                action.fid = (doc[0].fid + 1);
            } else {
                //第一个fid
                action.fid = 1;
            }
            action.save((err, result) => {
                if (err) {
                    return reject({message:'添加博客失败！', err:err, status:-99});
                }
                return resolve(result);
            });
        });
    })
};

/**
 * 【根据id查询单个blog】
 * @intro 每次点击 readCount + 1
 * @param id {object} id
 */
exports.findById = function (id) {
    //exec 可以返回promise实例
    return new Promise((resolve,reject) => {
        Blog.findById(id)
            .exec((err, doc) => {
            if (err) {
                return reject(err);
            }
            if (!doc) {
                return reject(Error('没有该博客!'));
            }
            doc.readCount ++;
            doc.save((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    });
};

/**
 * 【查询单个blog】
 * @param where {object} 查询条件
 */
exports.findOne = function (where) {
    return new Promise((resolve,reject) => {
        Blog.findOne(where).exec((err, result) => {
            if (err) {
                return reject(Error('查询博客失败!'));
            }
            return resolve(result);
        });
    });
};

/**
 *【查询所有blog】
 * @param where
 * @param offset
 * @param limit
 */
exports.findAll = function (where, offset, limit) {
    return new Promise((resolve,reject) => {
        Blog.find(where)
            .sort({createdAt : -1})
            .skip(offset)
            .limit(limit)
            .lean()
            .exec((err, result) => {
                if (err) {
                    return reject(Error('查询博客失败!'));
                }
                return resolve(result);
            });
    });
    //另外的写法 exec 返回promise实例
    //return Blog.find(conditions, fields, options).exec();
};

/**
 *【查询所有blog】
 * @param where
 * @param offset
 * @param limit
 */
exports.findAllAndCount = function (where, offset, limit) {
    return new Promise((resolve,reject) => {
        Blog.count(where, (err, count) => {
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
                    return resolve({
                        count: count,
                        rows: docs
                    });
                });
        });
    });
};
