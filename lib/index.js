/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

var fileParser = require('./file-parser');
var ncp = require('ncp');
var async = require('async');

function prepFolder(root, output, cb) {
  if (root !== output) {
    return ncp(root, output, cb);
  }
  return cb(null);
}

function template(paths, output, cb) {
  console.log(paths);
  console.log(output);
  cb();
}

function indexFinger(root, output, cb) {
  if (typeof output === 'function') {
    cb = output;
    output = root;
  }

  prepFolder(root, output, function (err) {
    if (err) { return cb(err); }
    async.waterfall([
      fileParser.bind(null, output),
      function (paths, done) {
        return template(paths, output, done);
      }
    ], cb);
  });
}

module.exports = indexFinger;
