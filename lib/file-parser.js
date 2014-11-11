/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/*eslint no-unused-vars: 1 */
'use strict';
var path = require('path');

var findit = require('findit');

function fileParser(root, cb) {
  var finder = findit(root);
  var indexed = {};

  finder.on('directory', function (dir, stat, stop) {
    if (dir !== root) {
      var dirname = path.dirname(dir);
      var key = path.relative(path.dirname(root), dirname);

      if (!indexed[key]) {
        indexed[key] = [];
      }

      indexed[key].push(path.basename(dir));
    }
  });

  finder.on('file', function (file, stat) {
    var dirname = path.dirname(file);
    var ext = path.extname(file);
    var key = path.relative(path.dirname(root), dirname);

    if (ext === '.js') {
      if (!indexed[key]) {
        indexed[key] = [];
      }
      indexed[key].push(path.basename(file));
    }
  });

  finder.on('end', function () {
    return cb(null, indexed);
  });

  finder.on('error', function (err) {
    return cb(err);
  });
}

module.exports = fileParser;
