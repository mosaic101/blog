/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of user
 */
const router = require('koa-router')();
import authorization from '../utils/authorization';
import userController from '../controllers/userController';

//TODO test
router.get('/', authorization.checkToken ,userController.index);
//login
router.post('/login', userController.login);


export default router;