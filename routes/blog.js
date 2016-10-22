/**
 * Created by mosaic101 on 2016/7/14.
 * intro: router of blog
 */
const router = require('koa-router')();
import blog from '../controllers/blog';

//添加
router.post('/add', blog.add);
//首页推荐
router.get('/commend', blog.commend);
//列表
router.get('/list', blog.list);
//单个详情
router.get('/one/:id', blog.one);

export default router;