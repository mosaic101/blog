var request = require('supertest')
var should = require('should')

require('../index')

var app = require('../app')


describe('Koa GET /', function(){
  it('index test', function(done){
    request(app.listen())
      .get('/tms/test?a=4&b=7')
      .set('Accept', 'application/text')
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        //console.logs(res)

        res.status.should.equal(200);
        // console.logs(res.text)
        res.should.have.property('body').and.be.a.Object();
        res.body.should.have.property('a').and.be.a.Number();
        res.body.should.have.property('b').and.be.a.Number();
        done();
      });
  })
})