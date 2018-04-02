var request = require('supertest');
var should = require('should');
describe('Testing Login', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /auth/login', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"username": "dfgsdfgsdfgaskdjhaskjda", "password": "fakeyfakey"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Array);
                done();
            })
    });
    after(function () {
        server.close();
    });
});