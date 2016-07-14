/**
 * Created by mosaic101 on 2016/7/14.
 * intro： controller of user
 */
const userService = require("../services/userService");

/**
 * index
 * @param ctx
 * @param next
 */
exports.index = (ctx, next) => {
    "use strict";
    console.log(JSON.stringify(ctx));
    ctx.body = {
        tag:"success",
        status:1,
        msg:"/user/ response!'"
    };
};

/**
 * login
 * @param ctx
 * @param next
 */
exports.login = (ctx, next) => {
    "use strict";
    var user = {
        name:"wujianjin",
        slug: "mosaic",
        email: "mosaic101@foxmail.com",
        password: 123456,
        headImg: '/uploads/images/0_1.jpg'
    };

    userService.login(user, function (err,result) {
        if (err) {
            return ctx.body = {
                tag:"error",
                status:-99,
                msg:err.msg
            };
        }
        console.log("result~~~~~~~~~~~~~~~~"+JSON.stringify(result));
        ctx.body = {
            tag:"success",
            status:1,
            msg:"添加成功!",
            token:result
        };
    });
};

/**
 * update
 * @param ctx
 * @param next
 */
exports.update = (ctx, next) => {
    "use strict";
    userService.update(function (err,result) {
        if (err) {
            return ctx.body = {
                tag:"error",
                status:-99,
                msg:err.msg
            };
        }
        ctx.body = {
            tag:"success",
            status:1,
            msg:"添加成功!"
        };
    });
};