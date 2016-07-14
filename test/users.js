var request = require('supertest')
var should = require('should')

require('../index')

var app = require('../app')


describe('Koa GET /users', function(){
  it('users test', function(done){
    request(app.listen())
      .get('/tms/users')
      .set('Accept', 'application/text')
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        //console.logs(res)
        res.status.should.equal(200);
        //console.logs(res.text)
        res.should.have.property('body').and.be.a.Object();
        // res.body.should.have.property('b').and.be.a.Number();
        done();
      });
  })
})