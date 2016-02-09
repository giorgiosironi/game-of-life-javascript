'use strict';

var app = require('../..');
import request from 'supertest';

describe('Planes API:', function() {
  describe('GET /api/planes', function() {
    it('should list the available planes', function(done) {
      request(app)
        .get('/api/planes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var planesList = res.body;
          planesList.elements.length.should.equal(3);
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

});
