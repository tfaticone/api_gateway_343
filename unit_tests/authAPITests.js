var request = require('supertest');
var should = require('should');


describe('Testing Auth', function () {
    var server;
    before(function (done) {
        server = require('../index.js');
        this.timeout(10000);
        server.on("appStarted", function() {
            console.log("app started");
            done();
        })
    });
    it('responds to POST /auth/login with no account', function testSlash(done) {
        request(server)
            .post('/auth/login')
            .send({"username": "dfgsdfgsdfgaskdjhaskjda", "password": "fakeyfakey"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('status').which.equals(false);
                res.body.should.have.property('message').which.equals("User account not found");
                done();
            })
    });
    it('responds to POST /auth/login with account', function testSlash(done) {
        request(server)
            .post('/auth/login')
            .send({"username": "test2", "password": "testing123"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('status').which.equals(true);
                res.body.should.have.property('token');
                done();
            })
    });
    it('responds to POST /auth/create without Password', function testSlash(done) {
        request(server)
            .post('/auth/create')
            .send({"username": "test2","type":"employee"})
            .expect(400)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('status').which.equals(false);
                res.body.should.have.property('message').which.equals('Improper Input');
                done();
            })
    });
    it('responds to POST /auth/create with duplicate username', function testSlash(done) {
        request(server)
            .post('/auth/create')
            .send({"username": "test2", "password": "testing123","type":"employee"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('status').which.equals(false);
                res.body.should.have.property('message').which.equals('Username already in use');
                done();
            })
    });
    it('responds to POST /auth/create successfully', function testSlash(done) {
        request(server)
            .post('/auth/create')
            .send({"username": makeid() + "test2", "password": makeid()+ "testing123","type":"employee"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('status').which.equals(true);
                res.body.should.have.property('message').which.equals('Account Created');
                res.body.should.have.property('token');
                done();
            })
    });
    after(function (done) {
        server.close(done);
    });
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}