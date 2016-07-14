/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of blog
 */
const router = require('koa-router')();
import blogController from '../controllers/blogController';

//test
router.get('/',  blogController.index);

export default router;