var router = require('koa-router')();

router.get('/', async (ctx, next) => {
   //ctx.state = {
   //  title: 'koa2 title'
   //};

  ctx.body = 'this a index response!';
  await ctx.render('index', {
    title:'吴建金的博客',
    name:'world'
  });
});

//用户
import userRoute from './userRoute';
//blog
import blogRoute from './blogRoute';

router.use('/user', userRoute.routes(),userRoute.allowedMethods());
router.use('/blog', blogRoute.routes(),blogRoute.allowedMethods());


export default router;