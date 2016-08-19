var router = require('koa-router')();
var fs = require('fs');
var markdown = require('markdown').markdown;
router.get('/', async (ctx, next) => {
   //ctx.state = {
   //  title: 'koa2 title'
   //};
  await ctx.render('index', {
    title:'吴建金的博客',
    name:'world'
  });
});

function getChangeLog () {
  return new Promise((resolve,reject) => {
    fs.readFile("./CHANGELOG.md", "utf8", function (error, data) {
      if (error) {
        return reject(error);
      }
      return resolve(markdown.toHTML(data));
    });
  })
}
//查看更新log
router.get('/change', async (ctx, next) => {
  ctx.body = await getChangeLog();
});

//用户
import userRoute from './userRoute';
//blog
import blogRoute from './blogRoute';

router.use('/user', userRoute.routes(),userRoute.allowedMethods());
router.use('/blog', blogRoute.routes(),blogRoute.allowedMethods());


export default router;