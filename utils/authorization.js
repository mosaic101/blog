/**
 * Created by mosaic101 on 2016/7/14.
 * introduction: 登录授权
 */
var jwt = require('jwt-simple');

/**
 * 解密token
 * @param token
 * @param callback
 * @returns {*}
 */
var getUserInfo = (ctx,callback) => {
    try{
        var decoded = jwt.decode(token, 'BLOG_APi_LOGIN');

        if(!decoded){
            return callback({message:"解析token失败!",status:-100});
        }

        if (decoded.exp <= Date.now()) {
            return callback({message:"登陆已过期，请重新登陆!",status:-401});
        }

        callback(null,decoded);

    }catch(error){
        return callback({message:"签名验证错误!",status:-100});
    }
};

/**
 * 验证token
 * @param req
 * @param res
 * @param next
 */
var checkToken = (ctx,next) => {

    var token = ctx.headers.authorization || null;
    if (!token) {
        return ctx.json({
            tag:"error",
            status: -1,
            message:"缺失token！"
        });
    }
    //解密token
    getUserInfo(token,function(error,result){
        if(error){
            console.log("checkToken" + error);
            return ctx.json({
                tag:"error",
                status: error.status,
                message: error.message
            });
        }
        //解析后的结果 auth
        ctx.session.auth = result;
        next();
    })
};



module.exports = {
    getUserInfo: getUserInfo,
    checkToken: checkToken

};

