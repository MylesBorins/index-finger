/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var fileParser = require('./file-parser');
var ncp = require('ncp');
var async = require('async');
var template = require('./template');

function prepFolder(root, output, cb) {
  if (root !== output) {
    return ncp(root, output, cb);
  }
  return cb(null);
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
      template
    ], cb);
  });
}

module.exports = indexFinger;
