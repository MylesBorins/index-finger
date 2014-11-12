/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var path = require('path');
var findit = require('findit');

/**
 * Callback for fileParser
 *
 * @callback fileParserCallback
 * @param {String} error - null if there is no error
 * @param {Object} paths - the keys of the object reference each folder that has been parse.
 * the value is an array of files and valid folders to be sourced
 */

/**
 * parse files from root directory
 *
 * @param {String} root - path to parse
 * @param {fileParserCallback} callback - run once parsing is completed
 */

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

      /* if a folder is found to have js files we need to make sure it is included in the parent array */
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
