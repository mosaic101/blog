var router = require('koa-router')();
var fs = require('fs');
var markdown = require('markdown').markdown;

router.get('/', async (ctx, next) => {
   //ctx.state = {
   //  title: 'koa2 title'
   //};
  await ctx.render('index/index', {
    title:'吴建金的博客',
    name:'world'
  });
});

function getChangeLog () {
  return new Promise((resolve,reject) => {
    fs.readFile("./CHANGELOG.md", "utf8",  (error, data) => {
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
import user from './user';
//blog
import blog from './blog';

router.use('/user', user.routes(),user.allowedMethods());
router.use('/blog', blog.routes(),blog.allowedMethods());


export default router;