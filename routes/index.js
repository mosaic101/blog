var router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  };

  ctx.body = 'this a index response!';
  //await ctx.render('index', {
  //});
});

//·用户
import users from'./users';

router.use('/users', users.routes());



export default router;