/**
 * Created by mosaic101 on 2016/7/14.
 * intro: 登录授权token
 */
import jwt from 'jwt-simple';

/**
 * 【解密token】
 * @param token
 */
var getUserInfo = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(token,'BLOG_APi_LOGIN');
        if(!decoded){
            return reject({message:'解析token失败!',status:-100});
        }
        if (decoded.exp <= Date.now()) {
            return reject({message:'登陆已过期，请重新登陆!',status:-401});
        }
        return resolve(decoded);
    })
};

/**
 * 【验证token】
 * @param ctx
 * @param next
 */
exports.checkToken = async (ctx,next) => {
    var token = ctx.header.authorization || null;
    console.log('token~~~'+token);
    if (!token) {
        return ctx.body = {
            tag:'error',
            status: -1,
            message:'token缺失！'
        };
    }
    try {
        //解析token
        let result = await getUserInfo(token);
        ctx.session.auth = result;
        next();
    }catch (err) {
        console.error('checkToken' + JSON.stringify(err));
        return ctx.body = {
            tag:'error',
            status: err.status || -99,
            message: err.message
        };
    }
};


