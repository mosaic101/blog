/**
 * Created by mosaic101 on 2016/11/21.
 * intro: routes of admin
 */
const router = require('koa-router')();
const _ = require('lodash');
const blogService = require('../services/topicService');


//后台登录页
router.get('/login', async (ctx,next) => {
    await ctx.render('./admin/login', {
        title:'后台管理'
    });
});

//登录
router.post('/login', async (ctx,next) => {
    let user = {
        userName: ctx.request.body.userName,
        pwd: ctx.request.body.pwd
    };
    if (user.userName != 'admin' && user.pwd != 'admin') {
        return ctx.error('账号或密码错误！');
    }
    ctx.session.user = user;
    return ctx.success(user);
});

//发布话题页面
router.get('/topic', async (ctx,next) => {
    await ctx.render('./admin/topic', {
        title:'发布话题'
    });
});

//发布话题
router.post('/topic', async (ctx,next) => {
    let body = ctx.request.body;
    var blog = {
        title: body.title,
        slug: body.title,
        markdown: body.markdown,
        html: body.html,
        type:'个人博客',
        state:'published',
        createdBy:'wujianjin',
        updatedBy:'wujianjin'
    };
    try {
        await blogService.add(blog);
        return ctx.success();
    }catch (err) {
        return ctx.error(err);
    }
});

export default router;