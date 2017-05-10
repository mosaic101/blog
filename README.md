一个基于Nodejs koa2的博客;
使用了ejs渲染模板，目前只有首页;
这个blog目前只是个基本雏形，完善中 ^_^！


Folder structure
=====

```
.
├── bin                         #启动脚本 node ./bin/www
├── config                      #config
├── demo                        #demo
├── log                         #操作日志
├── middlewares                 #自定义中间件
├── models                      #model层
├── public                      #静态资源
├── routes                      #路由层
├── schema                      #schema层
├── services                    #业务层
├── test                        #单元测试
├── utils                       #工具类
└── views                       #视图层

```
初步截图
=====

### pc端
首页
![welcome](./public/images/welcome.png)

列表
![blog_pc](./public/images/blog_pc.png)

详情
![topic_detail](./public/images/topic_detail.png)

后台登录
![admin_login](./public/images/admin_login.png)

发布
![admin_public](./public/images/admin_public.png)

### 移动端
![blog_pc](./public/images/blog_mobile.png)

Features
=====
* 支持markdown
* comment评论            //TODO
* message board留言板    //TODO
* 支持async/await 函数 (Babel required)
* node.js v7.6.0+
* 启动 npm start
* mongoose mongodb ORM module

Install
=====
    1. git clone https://github.com/mosaic101/koa2-blog.git
    2. cd koa2-blog
    3. npm install
    4. npm start
    5. http://localhost:4000
    6. 需要本地安装mongodb，并启动

Notice
=====
    1. 依赖node.js v7.6.0+ (Koa requires node v7.6.0 or higher for ES2015 and async function support.)
    2. async/await 函数是es7的特性,async函数里使用await可以做到和yield类似的效果，但await只能接受promise对象
    3. 用bluebird替换原生Promise,blurbird的性能是V8里内置的Promise 3倍左右bluebird 的优化方式见 https://github.com/petkaantonov/bluebird/wiki/Optimization-killers ）。

Ps
=====
    1. 觉得有帮助的顺手给颗星，十分谢谢！
    2. 欢迎大家提宝贵意见！
