'use strict';

var app = require('../..');
import request from 'supertest';
import Planes from './planes.model';
var MongoClient = require('mongodb').MongoClient;
import co from 'co';

describe('Planes API:', function() {
  var planes;

  beforeEach(function(done) {
    co(function*() {
      var db = yield MongoClient.connect('mongodb://localhost/gameoflifejavascript-dev');
      planes = new Planes(db.collection('planes'));
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
          expect(planesList.elements.length).to.equal(4);
          for (let plane of planesList.elements) {
            expect(plane.name).to.exist;
            expect(plane.title).to.exist;
          }
          done(err);
        });
    });
  });

  describe('GET /api/planes/statistics', function() {
    it('should show statistics on the custom planes', function(done) {
      planes.create({name: 'my-plane', aliveCells: [{x: 0, y: 0}]})
        .then(function() {
          request(app)
            .get('/api/planes/statistics')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              var planesList = res.body;
              expect(planesList.cells).to.be.defined;
              expect(planesList.cells.average).to.be.a('number');
              expect(planesList.cells.minimum).to.be.a('number');
              expect(planesList.cells.maximum).to.be.a('number');
              done(err);
            });
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
          expect(plane.aliveCells.length).to.equal(3 + 4);
          done(err);
        });
    });

    it('should answer not found when the plane does not exist', function(done) {
      request(app)
        .get('/api/planes/some-invented-name')
        .expect(404)
        .end(done);
    });

    describe("/generation", function() {
      it('should load a specific generation', function(done) {
        request(app)
          .get('/api/planes/a-block-and-bar/generation/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            var plane = res.body;
            expect(plane.aliveCells.length).to.equal(3 + 4);
            done(err);
          });
      });

      it('should still answer not found when further generations are requested for a plane that does not exist', function(done) {
        request(app)
          .get('/api/planes/some-invented-name/generation/4')
          .expect(404)
          .end(done);
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
              expect(planesList.elements.map((p) => { return p.name; }))
                .to.contain('glider');
              done(err);
            });
        });
    });

    it('should refuse overwriting an existing plane', function(done) {
      var planeData = {
        title: "Glider",
        aliveCells: []
      };
      request(app)
        .put('/api/planes/glider')
        .send(planeData)
        .expect(201)
        .end((err, res) => {
          request(app)
            .put('/api/planes/glider')
            .send(planeData)
            .expect(400)
            .end((err, res) => {
              expect(res.body.message).to.equal('plane-already-exists');
              done(err);
            });
        });
    });
  });

});
