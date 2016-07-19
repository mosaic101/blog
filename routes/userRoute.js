/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of user
 */
const router = require('koa-router')();
// import authorization from '../utils/authorization';
import userController from '../controllers/userController';

//注册
router.post('/register', userController.register);
//登录
router.post('/login', userController.login);
//查询单个用户
router.get('/one', userController.one);

export default router;