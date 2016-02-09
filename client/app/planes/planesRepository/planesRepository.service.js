'use strict';

angular.module('gameOfLifeJavascriptApp')
  .service('planesRepository', function($http) {
    // TODO: deal with 500
    this.listPlanes = function() {
      return $http.get('/api/planes');
    };
    this.findByName = function(name, generationIndex) {
      return $http.get('/api/planes/' + name + '/generation/' + generationIndex);
    };
  });
