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
        title:'test  test test test',
        slug:'test 2 test 2 test 2',
        markdown:'<div> helloWorld </div>',
        type:'个人博客',
        imgUrl: ['images/01.jpg','images/02.jpg','images/03.jpg'],
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
 * 【commend】
 * @param ctx
 * @param next
 */
exports.commend = async (ctx,next) => {
    let offset = ctx.params.offset || 0;
    let limit = ctx.params.limit || 6;
    let where = {state: 'published'};
    try {
        var result = await blogService.commend(where, offset, limit);
        ctx.body = {
            tag:'success',
            status:1,
            message:'查询成功!',
            data:result
        };
    }catch (err) {
        Logger.error('commend error', err);
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
    let offset = ctx.params.offset || 0;
    let limit = ctx.params.limit || 10;
    let where = {state: 'published'};
    try {
        var result = await blogService.list(where, offset, limit);
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

/**
 * 【one】
 * @param ctx
 * @param next
 */
exports.one = async (ctx,next) => {
    let id = ctx.params.id;
    if (!id || !_.isString(id)) {
        ctx.body = {
            tag:'error',
            status:-1,
            message:'参数错误!'
        };
    }
    try {
        var result = await blogService.one(id);
        ctx.body = {
            tag:'success',
            status:1,
            message:'查询成功!',
            data:result
        };
    }catch (err) {
        Logger.error('one error', err);
        ctx.body = {
            tag:'error',
            status:err.status,
            message:err.message
        };
    }
};