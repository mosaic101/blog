/**
 * Created by mosaic101 on 2016/11/21.
 * intro: routes of admin
 */
const router = require('koa-router')();
const _ = require('lodash');
const blogService = require('../services/blogService');


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

export default router;