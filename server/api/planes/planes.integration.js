'use strict';

var app = require('../..');
import request from 'supertest';

describe('Planes API:', function() {

  describe('GET /api/planes/:id', function() {
    var plane;

    it('should contain a list of alive cells', function() {
      request(app)
        .get('/api/planes/a-block-and-bar')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plane = res.body;
          plane.aliveCells.length.should.equal(3);
          done();
        });
    });

    it('should load a specific generation', function() {
      request(app)
        .get('/api/planes/a-block-and-bar/generation/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plane = res.body;
          plane.aliveCells.length.should.equal(3);
          done();
        });
    });

  });

});
