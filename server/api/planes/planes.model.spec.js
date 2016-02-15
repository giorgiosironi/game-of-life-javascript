'use strict';

var Planes = require('./planes.model');
var Cell = require('./cell.model');
var MongoClient = require('mongodb').MongoClient;
import co from 'co';

describe('Planes evolution throughout the generations', function() {
  var planes;
  var someCells = function(number) {
    var cells = [];
    for (let i = 0; i < number; i++) {
      cells.push({x: i, y: 0});
    }
    return cells;
  };

  beforeEach(function(done) {
    co(function*() {
      var db = yield MongoClient.connect('mongodb://localhost/gameoflifejavascript-dev');
      planes = new Planes(db.collection('planes'));
      yield planes.clean();
      done();
    });
  });

  it('should rotate a bar in the next generation', function() {
    var verticalBar = planes.verticalBar();
    var horizontalBar = planes.horizontalBar();
    expect(verticalBar.evolve()).to.deep.equal(horizontalBar);
  });

  it('should list default planes', function() {
    return expect(planes.listAll()).to.eventually.have.length(4);
  });

  it('should find default planes', function() {
    var verticalBar = planes.verticalBar();
    return expect(planes.findByName('vertical-bar')).to.eventually.equal(verticalBar);
  });

  it('should refuse to create already existing default planes', function() {
    return expect(planes.create({name: 'vertical-bar'})).to.be.rejected;
  });

  it('should refuse to create already existing custom planes', function() {
    var plane = {name: 'my-plane', title: 'My Plane', aliveCells: []};
    return planes.create(plane)
      .then(function() {
        return expect(planes.create(plane)).to.be.rejectedWith(Error);
      });
  });

  it('should aggregate statistics on the custom planes', function() {
    return Promise.all([
      planes.create({name: 'my-plane', title: 'My plane', aliveCells: someCells(4)}),
      planes.create({name: 'another-plane', title: 'Another plane', aliveCells: someCells(10)})
    ]).then(function() {
      return expect(planes.statistics()).to.eventually.deep.equal({
        cells: {
          average: 7,
          minimum: 4,
          maximum: 10
        }
      });
    });

  });
});
