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
    page.next();
    // TODO: better way to get to the next page? Maybe we should only check that we have reached it
    browser.wait(function() {
      return element(by.css('.generation .index')).getText(function(text) {
        return text == 1;
      });
    });
  });
});
