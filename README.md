一个基于Nodejs koa2的博客api，使用MVC风格的代码架构;
使用了ejs渲染模板;
后期准备用vue(不太熟，慢慢折腾吧！)

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
* Node 4.4.4
* 启动 node ./bin/run
* mongoose mongodb ORM module
* 前台准备用vue.js       //TODO

Install
=====
    1. git clone https://github.com/mosaic101/koa2-blog.git
    2. cd koa2-blog
    3. npm install
    4. 在log下，新建app、access两个文件夹
    5. node ./bin/run
    6. http://localhost:3000

notice
=====
    1.需要本地安装redis，并启动
    2.依赖Node.js 4.0+ (Koa requires node v4.0.0 or higher for (partial) ES2015 support.)
    3.koa-session 依赖包是基于cookie的,已经好久不维护了。这里用 koa-generic-session

ps
=====
    1.本人是个推崇全栈的程序猿，有兴趣的可以加扣扣群：45691985，互相交流学习！
    2.觉得有帮助的顺手给颗星，十分谢谢！
