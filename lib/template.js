'use strict';
var fs = require('fs');
var path = require('path');

var async = require('async');
var Handlebars = require('handlebars');

var templatePath = path.join(__dirname, '..', 'templates', 'template.hbs');
var source = fs.readFileSync(templatePath, 'utf8');
var compile = Handlebars.compile(source);

/**
 * Callback for template
 *
 * @callback templateCallback
 * @param {String} error - null if there is no error
 * @param {Object} templates - original paths object with values replaced with compiled templates
 */

/**
 * template the index file to be created for each path, requiring the appropriate files
 * @param {Object} paths - a paths object returned from file-parser.js
 * @param {templateCallback} callback - run once templating is completed
 */

function template(paths, cb) {
  async.reduce(Object.keys(paths), {}, function (memo, key, done) {
    memo[key] = compile({
      dependencies: paths[key]
    });
    return done(null, memo);
  }, cb);
}

module.exports = template;
