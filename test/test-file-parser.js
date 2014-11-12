/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var path = require('path');

var fileParser = require('../lib/file-parser');
var test = require('tape');

var fixturesPath = path.join(__dirname, 'fixtures', 'example');

var expected = require('./fixtures/expected-file-parsed');

test('file-parser: can load', function (t) {
  t.plan(1);
  t.ok(fileParser, 'it should be requireable');
});

test('file-parse: return', function (t) {
  t.plan(2);
  fileParser(fixturesPath, function (err, data) {
    t.notok(err, 'it should return without an error');
    t.deepEqual(data, expected, 'it should return the appropriate data');
  });
});
