'use strict';

describe('Service: planesRepository', function () {

  // load the service's module
  beforeEach(module('gameOfLifeJavascriptApp'));

  // instantiate service
  var planesRepository;
  beforeEach(inject(function (_planesRepository_) {
    planesRepository = _planesRepository_;
  }));

  it('should do something', function () {
    expect(!!planesRepository).toBe(true);
  });

});
