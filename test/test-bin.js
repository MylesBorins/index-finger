/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';
var os = require('os');
var path = require('path');

var test = require('tape');
var spawn = require('child_process').spawn;
var rimraf = require('rimraf');

var tempdir = os.tmpdir();

var source = path.join(__dirname, 'fixtures', 'example');
var output = path.join(tempdir, 'index-finger-bin');

function cleanup(t) {
  t.plan(1);
  rimraf(output, function (err) {
    t.notok(err, 'rimraf should not error removing directory');
  });
}

test('bin: setup', function (t) {
  cleanup(t);
});

test('bin: no args', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 1, 'it should exit with error code 1');
    t.equal(stderr, '', 'it should have no output on stderr');
    t.equal(stdout, 'Usage: index-finger [path to entry] {OPTIONS}\n\nStandard Options:\n\n\t-o Directory to write to other than source directory\n\t-h Show this message\n', 'it should output the help message on stdout');
  });
});

test('bin: help', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath, ['-h']);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0, 'it should exit with code 0');
    t.equal(stderr, '', 'there should be no output on stderr');
    t.equal(stdout, 'Usage: index-finger [path to entry] {OPTIONS}\n\nStandard Options:\n\n\t-o Directory to write to other than source directory\n\t-h Show this message\n', 'it should ouput the help message on stdout');
  });
});

test('bin: src and output', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath, [source, output]);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0);
    t.equal(stderr, '');
    t.equal(stdout, 'All Done!\n');
  });
});

test('bin: teardown', function (t) {
  cleanup(t);
});
