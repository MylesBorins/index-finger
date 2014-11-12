/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var path = require('path');
var findit = require('findit');

function fileParser(root, cb) {
  var finder = findit(root);
  var indexed = {};
  var rootName = path.basename(root);

  finder.on('file', function (file) {
    var dirname = path.dirname(file);
    var ext = path.extname(file);
    var key = path.relative(path.dirname(root), dirname);
    var basename = path.basename(key);
    dirname = path.dirname(key);

    if (ext === '.js') {
      if (!indexed[key]) {
        indexed[key] = [];
      }

      if (basename !== rootName && indexed[dirname] && indexed[dirname].indexOf(basename) === -1)  {
        indexed[dirname].push(basename);
        indexed[dirname].sort();
      }

      indexed[key].push(path.basename(file, '.js'));
      indexed[key].sort();
    }
  });

  finder.on('end', function () {
    cb(null, indexed);
  });

  finder.on('error', function (err) {
    return cb(err);
  });
}

module.exports = fileParser;
