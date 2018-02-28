/**
 * Created by mosaic101 on 2016/7/11.
 */
'use strict';
const path  = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const json = require('koa-json');
const Bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const favicon = require('koa-favicon');
const session = require('koa-session');
const config = require('getconfig');
const onerror = require('koa-onerror');
const logger = require('koa-logger');

//将node原生Promise替换成bluebird
global.Promise = require('bluebird');

//the index of routes
const index = require('./routes/index');

const app = new Koa();
const bodyparser = new Bodyparser();

//设置一个签名 Cookie 的秘钥,也可以借助KeyGrip生成你想的一个实例
app.keys = ['keys', 'koa2-blog'];

//settings session
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app))

// middlewares
app.use(convert(require('koa-static')(path.join(__dirname + '/public'))));
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

//ejs engine
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

app.use(convert(favicon(path.join(__dirname, "/public/favicon.ico"))));

// 500 error
onerror(app);

//add ctx.error(),ctx.success()
app.use(require('./middlewares/index').ctx);

//routes
app.use(index.routes(),index.allowedMethods());

//logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    //404 error handler
    if (ctx.status == 404) {
        const err = new Error('Not Found');
        err.status = 404;
        ctx.body = {
            tag: 'error',
            status: err.status,
            message: err.message,
            stack: err.stack
        };
    }
});

//error logger
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});


module.exports = app