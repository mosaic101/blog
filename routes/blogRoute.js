/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of blog
 */
const router = require('koa-router')();
import blogController from '../controllers/blogController';

//添加
router.post('/add', blogController.add);
//首页推荐
router.get('/commend', blogController.commend);
//列表
router.get('/list', blogController.list);
//单个详情
router.get('/one/:id', blogController.one);

export default router;