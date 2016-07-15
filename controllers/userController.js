/**
 * Created by mosaic101 on 2016/7/14.
 * intro： controller of user
 */
const userService = require('../services/userService');
const Logger = require("../utils/logger").Logger("userController");
/**
 * login
 * @param ctx
 */
exports.login = async (ctx) => {

    let user = {
        name:'wujianjin',
        slug: 'mosaic',
        email: 'mosaic101@foxmail.com',
        password: 123456,
        headImg: '/uploads/images/0_1.jpg'
    };
    //返回的promise对象，也可以使用.then().catch()
    try {
        let result = await userService.login(user);
        ctx.body = {
            tag:'success',
            status:1,
            message:'添加成功!',
            token:result
        };
    }catch (err){
        Logger.error('user login error', err);
        ctx.body = {
            tag:'error',
            status:err.status,
            message:err.message
        };
    }
};

/**
 * update
 * @param ctx
 * @param next
 */
exports.update = (ctx) => {
    userService.update(function (err,result) {
        if (err) {
            return ctx.body = {
                tag:'error',
                status:-99,
                message:err.message
            };
        }
        ctx.body = {
            tag:'success',
            status:1,
            message:'添加成功!'
        };
    });
};