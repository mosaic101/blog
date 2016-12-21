/**
 * Created by mosaic101 on 2016/7/14.
 * intro: routes of index
 */
const router = require('koa-router')();
const fs = require('fs');
const {markdown} = require('markdown');


//index of home
router.get('/', async (ctx, next) => {
    await ctx.redirect('/blog');
});

//查看更新log
router.get('/change', async (ctx, next) => {
    let changeLog = function () {
        return new Promise((resolve,reject) => {
            fs.readFile("./CHANGELOG.md", "utf8",  (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(markdown.toHTML(data));
            });
        })
    };
    ctx.body = await changeLog();
});



const topic = require('./topic');
const user = require('./user');
const admin = require('./admin');

router.use('/topic', topic.routes(),topic.allowedMethods());
router.use('/user', user.routes(),user.allowedMethods());
router.use('/admin', admin.routes(),admin.allowedMethods());


export default router;