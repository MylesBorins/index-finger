'use strict';

var fs = require('fs');
var path = require('path');

var test = require('tape');
var template = require('../lib/template');

var expectedPath = path.join(__dirname, 'fixtures', 'template', 'example.js');
var examplePaths = require('./fixtures/template/examplePaths');
var expectedOutput = fs.readFileSync(expectedPath, 'utf8');

test('template: can load', function (t) {
  t.plan(1);
  t.ok(template, 'it should be requireable');
});

test('template: works as expected', function (t) {
  t.plan(2);
  template(examplePaths, function (err, data) {
    t.notok(err, 'it should return without an error');
    t.deepEqual(data, expectedOutput, 'it should return the expected output');
  });
});
