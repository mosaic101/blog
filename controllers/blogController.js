/**
 * Created by mosaic101 on 2016/7/14.
 * intro： controller of blog
 */
const _ = require('lodash');
const blogService = require('../services/blogService');
const Logger = require("../utils/logger").Logger("blogController");

/**
 * 【add】
 * @param ctx
 * @param next
 */
exports.add = async(ctx) => {
    var blog = {
        title:'test 1',
        slug:'test 2',
        markdown:'<div> helloWorld </div>',
        html:'',
        state:'published',
        createdBy:'wujianjin',
        updatedBy:'wujianjin'
    };
    try {
        await blogService.add(blog);
        ctx.body = {
            tag:'success',
            status:1,
            message:'添加成功!'
        };
    }catch (err) {
        Logger.error('add error', err);
        ctx.body = {
            tag:'error',
            status:err.status,
            message:err.message
        };
    }
};

/**
 * 【index】
 * @param ctx
 * @param next
 */
exports.index = (ctx) => {
    ctx.body = '/blog/ response!';
};