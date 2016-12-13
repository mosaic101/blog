/**
 * Created by mosaic101 on 2016/7/14.
 * intro: routes of blog
 */
const router = require('koa-router')();
const _ = require('lodash');
const blogService = require('../services/blogService');


//首页
router.get('/', async (ctx,next) => {
    let offset = ctx.params.offset || 0;
    let limit = ctx.params.limit || 10;
    let where = {state: 'published'};
    try {
        var blog = await blogService.list(where, offset, limit);
        await ctx.render('./blog/list', {
            title:'吴建金的博客',
            blog: blog
        });
    }catch (err) {
        ctx.error(err);
    }
});

//单个详情
router.get('/one/:id', async (ctx,next) => {
    let id = ctx.params.id;
    if (!id || !_.isString(id)) {
        ctx.body = {
            tag:'error',
            status:-1,
            message:'参数错误!'
        };
    }
    try {
        var blog = await blogService.one(id);
        await ctx.render('./blog/detail', {
            title: blog.title,
            blog: blog
        });
    }catch (err) {
        ctx.error(err);
    }
});

//添加
router.post('/add', async (ctx,next) => {
    var blog = {
        title:'test  test test test',
        slug:'test 2 test 2 test 2',
        markdown:'<div> helloWorld </div>',
        type:'个人博客',
        images: ['images/01.jpg','images/02.jpg','images/03.jpg'],
        html:'',
        state:'published',
        createdBy:'wujianjin',
        updatedBy:'wujianjin'
    };
    try {
        await blogService.add(blog);
        ctx.success();
    }catch (err) {
        ctx.error(err);
    }
});




export default router;