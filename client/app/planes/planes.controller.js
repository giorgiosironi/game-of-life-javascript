'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function($scope, $routeParams, Flash, planesRepository, knobs, dimensionRanges) {

    $scope.name = $routeParams.name;
    $scope.knobs = knobs;
    let updateGeneration = function() {
      planesRepository.findByName(
        $scope.name,
        $scope.knobs.generationIndex
      ).then(function(plane) {
        $scope.plane = plane;
        // TODO: maybe all this shouldn't be related to the plane, since
        // it pollutes the server response
        $scope.plane.size = {};
        $scope.plane.size.x = {};
        $scope.plane.size.x.range = dimensionRanges.x;
        $scope.plane.size.y = {};
        $scope.plane.size.y.range = dimensionRanges.y;
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
        Flash.create('danger', err.message);
      });
    };
    $scope.updateGeneration = updateGeneration;
    $scope.$watch('knobs.generationIndex', updateGeneration);
  });
