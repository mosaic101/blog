/**
 * Created by mosaic101 on 2016/7/14.
 * intro: routes of index
 */
const router = require('koa-router')();
const fs = require('fs');
const {markdown} = require('markdown');


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

const blog = require('./blog');
const user = require('./user');

router.use('/blog', blog.routes(),blog.allowedMethods());
router.use('/user', user.routes(),user.allowedMethods());



export default router;