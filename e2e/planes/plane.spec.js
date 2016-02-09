'use strict';

var config = browser.params;

describe('Plane', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/planes/a-block-and-bar');
    page = require('./plane.po');
  });

  it('should show a generation', function() {
    expect(page.title.getText()).toBe('Plane: a-block-and-bar');
  });

  it('should transition between generations on demand', function() {
    page.next();
    page.waitForCurrentShownGeneration(1);
    page.prev();
    page.waitForCurrentShownGeneration(0);
  });

});
