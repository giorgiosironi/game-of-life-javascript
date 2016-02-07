'use strict';

var app = require('../..');
import request from 'supertest';

describe('Planes API:', function() {

  describe('GET /api/planes/:id', function() {
    var plane;

    beforeEach(function(done) {
      request(app)
        .get('/api/planes/a-block-and-bar')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plane = res.body;
          done();
        });
    });

    it('should contain a list of alive cells', function() {
      plane.aliveCells.length.should.equal(3);
    });

  });

});