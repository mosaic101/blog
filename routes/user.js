/**
 * Created by mosaic101 on 2016/7/14.
 * intro: routes of user
 */
const router = require('koa-router')();
const _ = require('lodash');
const userService = require('../services/userService');

//注册
router.post('/register', async (ctx,next) => {
    let user = {
        name:'wujianjin',
        slug: 'mosaic',
        email: 'mosaic101@foxmail.com',
        password: 123456,
        headImg: '/uploads/images/0_1.jpg'
    };
    //返回的promise对象，也可以使用.then().catch()
    try {
        let result = await userService.register(user);
        ctx.success(result);
    }catch (err) {
        ctx.error(err);
    }
});

//登录
router.post('/login', async (ctx,next) => {
    var user = ctx.request.body || {
            name:'wujianjin',
            password:'123456'
        };
    if (!user) {
        return ctx.body = {
            tag:'error',
            status:-1,
            message:'参数缺失！'
        };
    }
    try {
        var result = await userService.login(user);
        ctx.success(result);
    }catch (err) {
        ctx.error(err);
    }
});

//查询单个用户
router.get('/one', async (ctx,next) => {
    var _id = ctx.request.query.id || '579dee11391e4d639e76e4c6';
    if (!_id) {
        return ctx.body = {
            tag:'error',
            status:-1,
            message:'参数缺失！'
        };
    }
    try {
        let conditions = {_id: _id};
        await userService.one(conditions);
        ctx.success();
    }catch (err) {
        ctx.error(err);
    }
});

export default router;