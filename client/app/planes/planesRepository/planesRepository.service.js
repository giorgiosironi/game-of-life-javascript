'use strict';

angular.module('gameOfLifeJavascriptApp')
  .service('planesRepository', function ($http) {
    // TODO: deal with 500
    this.findByName = function(name, generationIndex) {
      return $http.get('/api/planes/' + name + '/generation/' + generationIndex);
    };
  });
