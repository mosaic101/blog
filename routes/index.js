var router = require('koa-router')();
var fs = require('fs');
var markdown = require('markdown').markdown;
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

//查看更新log
router.get('/change', (ctx, next) => {
  fs.readFile("./CHANGELOG.md", "utf8", function (error, data) {
    if (error) {
      console.log(error);
      //return next(error);
    } else {
      ctx.body = markdown.toHTML(data);
    }
  });
});

//用户
import userRoute from './userRoute';
//blog
import blogRoute from './blogRoute';

router.use('/user', userRoute.routes(),userRoute.allowedMethods());
router.use('/blog', blogRoute.routes(),blogRoute.allowedMethods());


export default router;