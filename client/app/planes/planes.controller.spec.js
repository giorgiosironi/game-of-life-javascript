'use strict';

describe('Controller: PlanesCtrl', function () {

  // load the controller's module
  beforeEach(module('gameOfLifeJavascriptApp'));

  var PlanesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanesCtrl = $controller('PlanesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
