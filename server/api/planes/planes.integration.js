'use strict';

var app = require('../..');
import request from 'supertest';
import Planes from './planes.model';
var MongoClient = require('mongodb').MongoClient;
import co from 'co';

describe('Planes API:', function() {
  beforeEach(function(done) {
    co(function*() {
      var db = yield MongoClient.connect('mongodb://localhost/gameoflifejavascript-dev');
      var planes = new Planes(db.collection('planes'));
      yield planes.clean();
      done();
    });
  });

  describe('GET /api/planes', function() {
    it('should list the available planes', function(done) {
      request(app)
        .get('/api/planes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var planesList = res.body;
          planesList.elements.length.should.equal(4);
          for (let plane of planesList.elements) {
            expect(plane.name).to.exist;
            expect(plane.title).to.exist;
          }
          done(err);
        });
    });
  });

  describe('GET /api/planes/:name', function() {
    it('should contain a list of alive cells', function(done) {
      request(app)
        .get('/api/planes/a-block-and-bar')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var plane = res.body;
          plane.aliveCells.length.should.equal(3 + 4);
          done(err);
        });
    });

    it('should load a specific generation', function(done) {
      request(app)
        .get('/api/planes/a-block-and-bar/generation/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var plane = res.body;
          plane.aliveCells.length.should.equal(3 + 4);
          done(err);
        });
    });
  });

  describe('PUT /api/planes/:name', function() {
    it('should create a new plane', function(done) {
      request(app)
        .put('/api/planes/glider')
        .send({
          title: "Glider",
          description: "Glider moving around",
          aliveCells: [
            {x: 3, y: 1},
            {x: 3, y: 2},
            {x: 3, y: 3},
            {x: 2, y: 3},
            {x: 1, y: 2},
          ]
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          // TODO: extract because I think the first err is not checked
          request(app)
            .get('/api/planes')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              var planesList = res.body;
              planesList.elements.map((p) => { return p.name; }).should.contain('glider');
              done(err);
            });
        });
    });
  });

});
