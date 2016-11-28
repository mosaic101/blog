/**
 * Created by mosaic101 on 2016/11/21.
 * intro: routes of admin
 */
const router = require('koa-router')();
const _ = require('lodash');
const blogService = require('../services/blogService');


//后台首页
router.get('/login', async (ctx,next) => {
    await ctx.render('admin/login', {
        title:'后台管理'
    });
});

//登录
router.post('/login', async (ctx,next) => {
    var user = {
        userName: ctx.request.body.userName,
        pwd: ctx.request.body.pwd
    };
    ctx.session.user = user;
    return ctx.redirect('/blog');
});


export default router;