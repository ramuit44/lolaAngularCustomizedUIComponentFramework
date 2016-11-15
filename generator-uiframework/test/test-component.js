'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('da:component', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/component'))
      .withPrompts({ prefix: 'gui', moduleName: 'common', name: 'test', appfolder: '/' })
      .on('end', done);
  });

  it('creates directive javascript file', function () {
    assert.file(['test-directive.js']);
  });

  it('creates directive javascript specs file', function () {
    assert.file(['test-directive.specs.js']);
  });

  it('creates the mock file', function () {
    assert.file(['test-mock.js']);
  });

  it('creates directive test html page', function () {
    assert.file(['test-page.html']);
  });

  it('creates directive template html file', function () {
    assert.file(['test-template.html']);
  });

  it('creates directive style less file', function () {
    assert.file(['test-style.less']);
  });

});
