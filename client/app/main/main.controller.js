'use strict';

(function() {


angular.module('gameOfLifeJavascriptApp')
  .controller('MainController', function(planesRepository, $scope) {
    planesRepository.listPlanes().then(function(planes) {
      $scope.planes = planes;
    });
  });

})();
