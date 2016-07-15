一个基于Nodejs koa2的博客api，使用MVC风格的代码架构;前端的项目还未启动，准备用vue

Folder structure
=====

```
.
├── bin                         #启动脚本 node ./bin/run
├── config                      #config
├── controllers                 #控制层
├── examples                    #schema层
├── filters                     #过滤层  //TODO
├── models                      #model层
├── routes                      #路由层
├── schema                      #schema
├── services                    #业务层
├── test                        #单元测试
└── utils                       #工具类

```

Features
=====
* markdown格式支持        //TODO
* highlight.js 代码高亮   //TODO
* MVC代码风格
* comment评论            //TODO
* message board留言板
* Node 4.4.4
* 启动 node ./bin/run
* mongoose mongodb ORM module
* 前台准备用vue.js       //TODO
* 后台管理基于angular.js //TODO

Install
=====

    1. npm install -g pm2
    2. git clone https://github.com/mosaic101/blog-api.git
    3. cd blog-api
    4. npm install
    5. node ./bin/run

notice
=====
    1.需要本地安装redis，并启动
    2.依赖Node.js 4.0+ (Koa requires node v4.0.0 or higher for (partial) ES2015 support.)
    3.koa-session 依赖包是基于cookie的,已经好久不维护了。这里用 koa-generic-session

ps
=====
    1.本人是个推崇全栈的程序猿，有兴趣的可以加扣扣群：45691985，互相交流学习！
    2.觉得有帮助的顺手给颗星，十分谢谢！
