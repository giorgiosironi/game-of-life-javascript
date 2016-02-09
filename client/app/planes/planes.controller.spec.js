'use strict';

describe('Controller: PlanesCtrl', function () {

  beforeEach(module('gameOfLifeJavascriptApp'));

  var $rootScope, PlanesCtrl, $scope, planesRepository;

  beforeEach(inject(function ($controller, _$rootScope_, _$routeParams_, $q) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    planesRepository = {
      findByName: function() {
        return $q(function(resolve) {
          resolve({
            data: {
              aliveCells: [{x: 0, y: 1}]
            }
          });
        });
      }
    };
    PlanesCtrl = $controller('PlanesCtrl', {
      $scope: $scope,
      $routeParams: _$routeParams_,
      planesRepository: planesRepository
    });
  }));

  it('should load generation 0 for the requested plane', function () {
    expect($scope.knobs.generationIndex).toBe(0);
    $scope.updateGeneration();
    $rootScope.$apply();
    expect($scope.plane.aliveCells.length).toBe(1);
  });
});
