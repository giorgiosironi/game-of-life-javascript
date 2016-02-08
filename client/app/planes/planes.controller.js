'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function ($scope, $routeParams, planesRepository) {
    var range = function(start, length) {
      var result = [];
      for (var i = start; i < start + length; i++) {
        result.push(i);
      }
      return result;
    };

    $scope.message = 'Hello';
    $scope.name = $routeParams.name;
    $scope.knobs = {};
    $scope.knobs.generationIndex = 0;
    $scope.knobs.decreaseGeneration = function() {
      $scope.knobs.generationIndex--;
    };
    $scope.knobs.increaseGeneration = function() {
      $scope.knobs.generationIndex++;
    };
    $scope.knobs.update = function() {
      planesRepository.findByName($scope.name, $scope.knobs.generationIndex).then(function(response) {
        $scope.plane = response.data;
        $scope.plane.size = {};
        $scope.plane.size.x = {};
        $scope.plane.size.x.range = range(0, 10);
        $scope.plane.size.y = {};
        $scope.plane.size.y.range = range(0, 10);
        $scope.plane.alive = function(x, y) {
          // TODO: use a map for O(1) search
          for (var c in $scope.plane.aliveCells) {
            var cell = $scope.plane.aliveCells[c];
            if (cell.x === x && cell.y === y) {
              return true;
            }
          }
          return false;
        };
      });
    };
    // not necessary, it seems, because the knobs.generationIndex initialization
    // is already triggering at the end of the creation of this controller
    //$scope.knobs.update();
    $scope.$watch('knobs.generationIndex', $scope.knobs.update);
  });
