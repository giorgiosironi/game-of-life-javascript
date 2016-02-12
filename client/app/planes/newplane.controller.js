'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('NewPlaneCtrl', function($scope, dimensionRanges, Plane, planesRepository) {
    $scope.dimensionRanges = dimensionRanges;
    $scope.plane = new Plane();
    $scope.toggle = function(x, y) {
      $scope.plane.toggle(x, y);
    };
    $scope.alive = function(x, y) {
      return $scope.plane.alive(x, y);
    }
    $scope.create = function() {
      // TODO: better name, maybe plane and we should rename the existing Plane instance
      planesRepository.create(
        $scope.plane.name,
        $scope.plane.state()
      );
    }
  });
