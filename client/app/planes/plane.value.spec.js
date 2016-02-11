'use strict';

describe('Plane', function() {
  beforeEach(module('gameOfLifeJavascriptApp'));

  var Plane;

  beforeEach(inject(function(_Plane_) {
    Plane = _Plane_;
  }));

  it('should toggle cells on', inject(function(Plane) {
    var plane = new Plane();
    plane.toggle(1, 2);
    expect(plane.alive(1, 2)).toBe(true);
    expect(plane.alive(3, 4)).toBe(false);
  }));

  it('should toggle cells off', inject(function(Plane) {
    var plane = new Plane();
    plane.toggle(1, 2);
    plane.toggle(1, 2);
    expect(plane.alive(1, 2)).toBe(false);
  }));
});
