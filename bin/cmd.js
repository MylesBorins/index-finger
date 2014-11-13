#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*eslint no-process-exit:0*/

'use strict';

var path = require('path');

var argv = require('minimist')(process.argv.slice(2));
var indexFinger = require('../lib');

var src = argv._[0];
var dest = argv._[1] || src;

function makePath(src) {
  if (src[0] === '/') { return src; }
  return path.join(process.cwd(), src);
}

function help() {
  console.log('Usage: index-finger [path to entry] {OPTIONS}');
  console.log('');
  console.log('Standard Options:');
  console.log('');
  console.log('\t-o Directory to write to other than source directory');
  console.log('\t-h Show this message');
}

if (argv.h) {
  help();
  process.exit(0);
}

if (!src) {
  help();
  process.exit(1);
}

src = makePath(src);
dest = makePath(dest);

indexFinger(src, dest, function (err) {
  if (err) {
    console.error(new Error(err));
    process.exit(1);
  }
  console.log('All Done!');
  process.exit(0);
});
