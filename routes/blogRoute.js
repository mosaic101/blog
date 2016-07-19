/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of blog
 */
const router = require('koa-router')();
import blogController from '../controllers/blogController';

//add
router.post('/add',  blogController.add);
//index
router.get('/',  blogController.index);

export default router;