/**
 * Created by mosaic101 on 2016/7/11.
 */
import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import Bodyparser from 'koa-bodyparser';
import session from 'koa-generic-session';
import mongoose from 'mongoose';
import redisStore from 'koa-redis';
import config from 'getconfig';
// import logger from 'koa-logger';
var log4js = require('./utils/logger').log4js; //加载日志模块
var Logger = require("./utils/logger").Logger("access");

//the index of router
const index = require('./routes/index');

const app = new Koa();
const bodyparser = new Bodyparser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
// app.use(convert(logger()));

//设置一个签名 Cookie 的秘钥,也可以借助KeyGrip生成你想的一个实例
app.keys = ['keys', 'blog-api'];
//setting session
app.use(session({
  store: redisStore({
    host: config.redis.host,
    port: config.redis.port
  })
}));

//static file
//app.use(convert(require('koa-static')(__dirname + '/public')));

//app.use(views(__dirname + '/views', {
//  extension: 'jade'
//}));


// mongoose.connect('mongodb://dev:root@112.124.36.12:27017/atvillage', function(err) {
// mongoose.connect('mongodb://localhost/blog', (err) => {
//   if (err) throw err;
//   console.log('connect mongodb`s database success!!!!');
// });

//connect mongodb's database
mongoose.connect('mongodb://' + config.host + '/blog');
var db = mongoose.connection;
//检测mongodb error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('connect mongodb success!');
});

//TODO logger
app.use(async (ctx, next) => {
  //将logger方法绑到ctx上
  // ctx.logger = logger;
  console.log('...');
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  // return next().then(() => {
  //   const ms = new Date() - start;
  //   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  // });

  //404错误处理
  if (ctx.status == 404) {
    Logger.error(ctx.method, ctx.originalUrl, '404');
    var err = new Error('Not Found');
    err.status = 404;
    ctx.body = {
      tag: 'error',
      status:404,
      message: 'this url don`t exist !!!'
    };
  }
});


app.use(index.routes(),index.allowedMethods());
//router.use('/', index.routes(), index.allowedMethods());
//router.use('/users', users.routes(), users.allowedMethods());

//TODO response
app.on('error', (err, ctx) => {
  console.error(err);
  // Logger.error('server error', err, ctx);
  // logger.error('server error', err, ctx);
});


export default app;