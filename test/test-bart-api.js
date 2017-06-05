global.DATABASE_URL = 'mongodb://admin:admin@ds131511.mlab.com:31511/final-capstone-bart-schedule';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Schedule = require('../models/schedule.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('final-capstone-bart-schedule', function () {
    before(function (done) {
        server.runServer(function () {
            Schedule.create({
                origin: '12TH',
                destination: '24TH'
            }, {
                origin: 'WOAK',
                destination: 'WARM'
            }, {
                origin: 'CAST',
                destination: 'BALB'
            }, function () {
                done();
            });
        });
    });

    describe('final-capstone-bart-schedule', function () {

        it('should list schedules on GET', function (done) {
            chai.request(app)
                .get('/schedule/DUBL/WOAK')
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
        it('should add an favorite on POST', function (done) {
            chai.request(app)
                .post('/add-to-favorites')
                .send({
                    'origin': 'BALB',
                    'destination': 'BAYF'
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('origin');
                    res.body.should.have.property('destination');
                    res.body.should.have.property('_id');
                    res.body.origin.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.origin.should.equal('BALB');
                    res.body.destination.should.equal('BAYF');
                    done();
                });
        });

        it('should delete an item on DELETE', function (done) {
            chai.request(app)
                .delete('/')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });

    });


    after(function (done) {
        Schedule.remove(function () {
            done();
        });
    });
});
