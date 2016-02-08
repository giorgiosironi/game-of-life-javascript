'use strict';

angular.module('gameOfLifeJavascriptApp')
  .service('planesRepository', function ($http) {
    this.findByName = function(name, generationIndex) {
      return $http.get('/api/planes/' + name + '/generation/' + generationIndex);
    };
  });
