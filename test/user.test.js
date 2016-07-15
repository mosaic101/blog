/**
 * Created by wujj on 2016/5/31.
 * introduction: 单元测试
 */
//TODO 用import 不支持 mocha
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('route/user', function() {
    var user = {
        name:'wujianjin',
        slug: 'mosaic',
        email: 'mosaic101@foxmail.com',
        password: 123456,
        headImg: '/uploads/images/0_1.jpg'
    };
    describe('user`s password', function() {
        it('password should be type of number', function(done) {
            user.password.should.be.exactly(6).and.be.a.Number;
            done();
        });
        it('login', function(done) {
            request.post('/user/login')
                .send({
                    name: user.name,
                    password: user.password
                })
                .end(function(err, res) {
                    if (err) {
                        should.not.exist(err);
                        res.text.should.containEql('用户名或密码不能为空！');
                    }
                    done();
                });
        });
    });

});