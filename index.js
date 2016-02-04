/**
 * @license
 * Copyright (c) 2016 srikkbhat. All rights reserved.
 */
// jshint node:true
'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var pvn = require('progressive-vulcans');
var oassign = require('object-assign');
var fs = require('fs');
var rimraf = require('rimraf');

function createFile(file, filename, contents) {
  return new gutil.File({
    cwd: file.cwd,
    base: file.base,
    path: filename,
    contents: new Buffer(contents)
  });
}

module.exports = function (opts) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-progressive-vulcans', 'Streaming not supported'));
      return;
    }
    opts.destdir = '.pvngulp/'
    var ProgressiveVulcans =  new pvn(opts);
    var stream = this;

    ProgressiveVulcans
    .build(file.path)
    .then(function() {
      var pvnOutFiles = ProgressiveVulcans.pvnOutFiles;
      ProgressiveVulcans.pvnOutFiles.forEach(function(filename) {
        stream.push(createFile(file, path.relative(ProgressiveVulcans.destdir, filename), fs.readFileSync(filename)));
      });
      rimraf.sync(opts.destdir, {});
      cb();
    })
    .catch(function(err){
      cb(new gutil.PluginError('gulp-progressive-vulcans', 'Error during vulcanization'));
      return;
    })
  });
};
