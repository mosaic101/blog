/**
 * Created by mosaic101 on 2016/7/11.
 */
import path  from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import Bodyparser from 'koa-bodyparser';
import views from 'koa-views';
import favicon from 'koa-favicon';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';
import mongoose from 'mongoose';
import config from 'getconfig';
import onerror from 'koa-onerror';
import logger from 'koa-logger';

//将node原生Promise替换成bluebird
global.Promise = require('bluebird');
//use native promises Instead of mpromise //mongoose return mpromise
mongoose.Promise = global.Promise;
//connect mongodb's database
let DATABASE_URL = 'mongodb://' + config.host + '/blog';

//the index of routes
const index = require('./routes/index');

const app = new Koa();
const bodyparser = new Bodyparser();

//设置一个签名 Cookie 的秘钥,也可以借助KeyGrip生成你想的一个实例
app.keys = ['keys', 'koa2-blog'];

// middlewares
app.use(convert(require('koa-static')(path.join(__dirname + '/public'))));
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
//settings session
app.use(session({
    store: redisStore({
        host: config.redis.host,
        port: config.redis.port
    })
}));

//ejs engine
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

//mongodb
mongoose.connect(DATABASE_URL, (err) => {
    if (err) throw err;
    console.log('connect mongodb`s database success!!!!');
});

// 500 error
onerror(app);

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

//routes
app.use(index.routes(),index.allowedMethods());

//error logger
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});


export default app;