/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of blog
 */
const router = require('koa-router')();
import blogController from '../controllers/blogController';

//添加
router.post('/add', blogController.add);
//首页推荐列表
router.get('/recommend', blogController.recommend);
//列表
router.get('/list', blogController.list);

export default router;