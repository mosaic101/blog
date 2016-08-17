一个基于Nodejs koa2的博客api，使用MVC风格的代码架构;
使用了ejs渲染模板，目前只有首页;
已经开始着手angular写页面了(不太熟，慢慢折腾吧！)；
这个blog目前只是个基本雏形，完善中 ^_^！


Folder structure
=====

```
.
├── bin                         #启动脚本 node ./bin/run
├── config                      #config
├── controllers                 #控制层
├── examples                    #一些代码案例  //TODO
├── models                      #model层
├── public                      #静态资源
├── routes                      #路由层
├── schema                      #schema
├── services                    #业务层
├── test                        #单元测试
├── utils                       #工具类
└── views                       #视图层

```

Features
=====
* markdown格式支持        //TODO
* MVC代码风格
* comment评论            //TODO
* message board留言板    //TODO
* 支持async/await 函数 (Babel required)
* Node 4.4.4
* 启动 node ./bin/run
* mongoose mongodb ORM module

Install
=====
    1. git clone https://github.com/mosaic101/koa2-blog.git
    2. cd koa2-blog
    3. npm install
    4. node ./bin/run
    5. http://localhost:3000
    6. 需要本地安装redis，并启动

Notice
=====
    1. 依赖Node.js 4.0+ (Koa requires node v4.0.0 or higher for (partial) ES2015 support.)
    2. koa-session 依赖包是基于cookie的,已经好久不维护了。这里用 koa-generic-session
    3. async/await 函数是es7的特性,async函数里使用await可以做到和yield类似的效果，但await只能接promise对象
    4. 用bluebird替换原生Promise,blurbird的性能是V8里内置的Promise 3倍左右bluebird 的优化方式见 https://github.com/petkaantonov/bluebird/wiki/Optimization-killers ）。

Ps
=====
    1. 本人是个推崇js全栈的程序猿，有兴趣的可以加扣扣群：45691985，互相交流学习！
    2. 觉得有帮助的顺手给颗星，十分谢谢！
