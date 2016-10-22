/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of user
 */
const router = require('koa-router')();
// import authorization from '../utils/authorization';
import user from '../controllers/user';

//注册
router.post('/register', user.register);
//登录
router.post('/login', user.login);
//查询单个用户
router.get('/one', user.one);

export default router;