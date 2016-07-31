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
exports.add = async(ctx,next) => {
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
 * 【list】
 * @param ctx
 * @param next
 */
exports.list = async (ctx,next) => {
    let conditions = {"state": "published"};
    let fields = {_id:0};
    let options = {skip : 0, limit : 2};
    try {
        var result = await blogService.list(conditions, fields, options);
        ctx.body = {
            tag:'success',
            status:1,
            message:'查询成功!',
            data:result
        };
    }catch (err) {
        Logger.error('list error', err);
        ctx.body = {
            tag:'error',
            status:err.status,
            message:err.message
        };
    }
};