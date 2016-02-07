'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/planes/a-block-and-bar');
    page = require('./plane.po');
  });

  it('should show a plane', function() {
    expect(page.title.getText()).toBe('Plane: a-block-and-bar');
    // TODO: check number of cells, their state
  });
});
