'use strict';
var fs = require('fs');
var path = require('path');

var async = require('async');
var Handlebars = require('handlebars');

var templatePath = path.join(__dirname, '..', 'templates', 'template.hbs');
var source = fs.readFileSync(templatePath, 'utf8');
var compile = Handlebars.compile(source);

function template(paths, cb) {
  async.reduce(Object.keys(paths), {}, function (memo, key, done) {
    memo[key] = compile({
      dependencies: paths[key]
    });
    return done(null, memo);
  }, cb);
}

module.exports = template;
