var router = require('koa-router')();

router.get('/',  (ctx, next) => {
  ctx.body = 'this a users ~~~~ response!';
});

export default router;