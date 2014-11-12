'use strict';

var test = require('tape');
var template = require('../lib/template');

var examplePaths = require('./fixtures/template/examplePaths');
var expected = require('./fixtures/template/expected');

test('template: can load', function (t) {
  t.plan(1);
  t.ok(template, 'it should be requireable');
});

test('template: works as expected', function (t) {
  t.plan(2);
  template(examplePaths, function (err, data) {
    t.notok(err, 'it should return without an error');
    t.deepEqual(data, expected, 'it should return the expected output');
  });
});
