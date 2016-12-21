/**
 * TODO 验证参数中间件
 * Created by mosaic101 on 2016/11/28.
 */

module.exports =  (schema, options) => {
    // options = options || {};
    //生成校验中间件
    // return async (ctx, next) => {
        // let toValidate = {};
        // if (!schema) {
        //     await next();
        // }
        // ['params', 'body', 'query'].forEach(function (key) {
        //     if (schema[key]) {
        //         toValidate[key] = ctx[key];
        //     }
        // });
        // return Joi.validate(toValidate, schema, options, (err) => {
        //     if (err) {
        //         let details = err && err.details || [];
        //         let failures = [];
        //         for (let detail of details) {
        //             failures.push(detail.message);
        //         }
        //         return res.validationFailed(failures);
        //     }
        //     await next();
        // });
    // }
};