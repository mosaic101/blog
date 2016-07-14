/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of user
 */
const router = require('koa-router')();
import userController from '../controllers/userController';

//TODO test
router.get('/',  userController.index);
//login
router.get('/login',  userController.login);


export default router;