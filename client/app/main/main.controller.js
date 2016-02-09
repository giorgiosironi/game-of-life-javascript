'use strict';

(function() {


angular.module('gameOfLifeJavascriptApp')
  .controller('MainController', function(planesRepository, $scope) {
    planesRepository.listPlanes().then(function(response) {
      $scope.planes = response.data.elements;
    });
  });

})();
