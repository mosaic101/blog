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
 * 【recommend】
 * @condition limit:6,order by 阅读量倒叙
 * @param ctx
 * @param next
 */
exports.recommend = async (ctx,next) => {
    let conditions = {state: 'published'};
    let fields = {_id: 0};
    let options = {sort: { createdAt: -1 }, skip : 0, limit : 6};
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

/**
 * 【list】
 * @param ctx
 * @param next
 */
exports.list = async (ctx,next) => {
    let conditions = {"state": "published"};
    let fields = {};
    let options = {sort: { createdAt: -1 }, skip : 0, limit : 6};
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