/**
 * Created by mosaic101 on 2016/7/14.
 * intro: 登录授权token
 */
var jwt = require('jwt-simple');

/**
 * 解密token
 * @param token
 * @param callback
 * @returns {*}
 */
var getUserInfo = (token,callback) => {
    var decoded = jwt.decode(token,"BLOG_APi_LOGIN");
    if(!decoded){
        return callback({message:"解析token失败!",status:-100});
    }
    if (decoded.exp <= Date.now()) {
        return callback({message:"登陆已过期，请重新登陆!",status:-401});
    }
    return callback(null,decoded);
};

/**
 * 验证token
 * @param req
 * @param res
 * @param next
 */
var checkToken = (ctx,next) => {

    var token = ctx.header.authorization || null;
    if (!token) {
        return ctx.body = {
            tag:"error",
            status: -1,
            message:"缺失token！"
        };
    }
    //解密token
    getUserInfo(token,(error,result) => {
        if(error){
            console.error("checkToken" + JSON.stringify(error));
            return ctx.body = {
                tag:"error",
                status: error.status,
                message: error.message
            };
        }
        console.log("result"+JSON.stringify(result));
        //解析后的结果存入session中
        ctx.session.auth = result;
        next();
    });

};



module.exports = {
    getUserInfo: getUserInfo,
    checkToken: checkToken
};

