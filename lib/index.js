/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var path = require('path');
var fs = require('fs');

var fileParser = require('./file-parser');
var ncp = require('ncp');
var async = require('async');
var template = require('./template');

/**
 * Basic Node Style Callback
 *
 * @callback nodeCallback
 * @param {String} error - null if there is no error
 */

/**
 * copy source to destination if destination provided
 *
 * @param {String} root - path to source folder
 * @param {String} output - path to output folder
 * @param {nodeCallback} callback - run once copying is completed
 */

function prepFolder(root, output, cb) {
  if (root !== output) {
    return ncp(root, output, cb);
  }
  return cb(null);
}

/**
 * write templated files to appropriate places in filesystem
 *
 * @param {String} output - path to output folder
 * @param {Object} templates - key is path to write to, value is template to write
 * @param {nodeCallback} callback - run once writing files is completed
 */

function writeIndex(output, templates, cb) {
  async.each(Object.keys(templates), function (key, done) {
    var outputPath = path.join(path.dirname(output), key, 'index.js');
    fs.writeFile(outputPath, templates[key], done);
  }, cb);
}

/**
 * write templated files to appropriate places in filesystem
 *
 * @param {String} root - path to source folder
 * @param {String} output - path to output folder
 * @param {nodeCallback} callback - run once writing files is completed
 */

function indexFinger(root, output, cb) {
  if (typeof output === 'function') {
    cb = output;
    output = root;
  }

  prepFolder(root, output, function (err) {
    if (err) { return cb(err); }
    async.waterfall([
      fileParser.bind(null, output),
      template,
      function (templates, done) {
        return writeIndex(output, templates, done);
      }
    ], cb);
  });
}

module.exports = indexFinger;
