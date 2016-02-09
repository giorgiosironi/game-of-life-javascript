'use strict';

describe('Service: planesRepository', function () {

  beforeEach(module('gameOfLifeJavascriptApp'));

  var planesRepository, $httpBackend;

  beforeEach(inject(function (_planesRepository_, _$httpBackend_) {
    planesRepository = _planesRepository_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should load the generation alive cells', function () {
    var spy = jasmine.createSpy();
    $httpBackend.expect('GET', '/api/planes/a-block-and-bar/generation/3').respond({
      aliveCells: [{x: 1, y: 2}]
    });
    planesRepository.findByName('a-block-and-bar', 3).then(spy);
    $httpBackend.flush();
  });
});
