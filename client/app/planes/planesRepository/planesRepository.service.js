'use strict';

angular.module('gameOfLifeJavascriptApp')
  .service('planesRepository', function($http) {
    // TODO: deal with 500
    this.listPlanes = function() {
      return $http.get('/api/planes')
        .then(function(response) {
          return response.data.elements;
        });
    };
    this.findByName = function(name, generationIndex) {
      return $http.get('/api/planes/' + name + '/generation/' + generationIndex)
        .then(function(response) {
          return response.data;
        });
    };
    this.create = function(name, state) {
      return $http.put('/api/planes/' + name, state);
    };
  });
