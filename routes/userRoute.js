/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of user
 */
const router = require('koa-router')();
import authorization from '../utils/authorization';
import userController from '../controllers/userController';

//登录
router.post('/login',userController.login);
//查询
router.get('/find', authorization.checkToken, userController.update);
//查询
router.post('/update', authorization.checkToken, userController.update);

export default router;