'use strict';

describe('Directive: cell', function() {

  // load the directive's module
  beforeEach(module('gameOfLifeJavascriptApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<td cell cell-x="1" cell-y="2"></td>');
    element = $compile(element)(scope)[0];
    // TODO: extract the correct element without [0]
    var a = element.querySelectorAll('a.cell_tooltip')[0];
    // TODO: assert it's an <a>
    // TODO: assert on attributes title and class
    // TODO: assert there is no text
    expect(a.outerHTML).toBe('<a title="x={{ cellX }}, y={{ cellY }}" class="cell_tooltip"></a>');
  }));
});
