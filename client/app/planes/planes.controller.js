'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function($scope, $routeParams, planesRepository, knobs) {
    var range = function(start, length) {
      var result = [];
      for (let i = start; i < start + length; i++) {
        result.push(i);
      }
      return result;
    };

    $scope.name = $routeParams.name;
    $scope.knobs = knobs;
    let updateGeneration = function() {
      planesRepository.findByName(
        $scope.name,
        $scope.knobs.generationIndex
      ).then(function(response) {
        $scope.plane = response.data;
        $scope.plane.size = {};
        $scope.plane.size.x = {};
        $scope.plane.size.x.range = range(0, 10);
        $scope.plane.size.y = {};
        $scope.plane.size.y.range = range(0, 10);
        $scope.plane.alive = function(x, y) {
          // TODO: use a map for O(1) search
          for (let c in $scope.plane.aliveCells) {
            var cell = $scope.plane.aliveCells[c];
            if (cell.x === x && cell.y === y) {
              return true;
            }
          }
          return false;
        };
      }, function(err) {
        console.error(err);
      });
    };
    $scope.updateGeneration = updateGeneration;
    $scope.$watch('knobs.generationIndex', updateGeneration);
  });
