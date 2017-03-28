/**
 * Created by mosaic101 on 2016/7/14.
 * intro: routes of blog
 */
const router = require('koa-router')();
const _ = require('lodash');
const topicService = require('../services/topicService');


//首页
router.get('/',async (ctx,next) => {
    let offset = ctx.params.offset || 0;
    let limit = ctx.params.limit || 10;
    let where = {state: 'published'};
    try {
        var topic = await topicService.list(where, offset, limit);
        await ctx.render('./topic/list', {
            title:'吴建金的博客',
            topic: topic
        });
    }catch (err) {
        ctx.error(err);
    }
});

//单个详情
router.get('/:id', async (ctx,next) => {
    let id = ctx.params.id;
    if (!id || !_.isString(id)) {
        ctx.body = {
            tag:'error',
            status:-1,
            message:'参数错误!'
        };
    }
    try {
        var topic = await topicService.one(id);
        await ctx.render('./topic/detail', {
            title: topic.title,
            topic: topic
        });
    }catch (err) {
        ctx.error(err);
    }
});

//添加
router.post('/add', async (ctx,next) => {
    var topic = {
        title:'test  test test test',
        slug:'test 2 test 2 test 2',
        markdown:'<div> helloWorld </div>',
        type:'个人博客',
        images: ['images/01.jpg','images/02.jpg','images/03.jpg'],
        html:'',
        state:'published',
        createdBy:'wujianjin',
        updatedBy:'wujianjin'
    };
    try {
        await topicService.add(topic);
        ctx.success();
    }catch (err) {
        ctx.error(err);
    }
});


module.exports = router