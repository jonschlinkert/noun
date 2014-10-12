/*!
 * noun <https://github.com/jonschlinkert/noun>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var plugins = require('load-plugins');
var extend = require('./utils');


/**
 * Create an instance of `Noun` with the given
 * `context` and `options`.
 *
 * @param {Object} `context`
 * @param {Object} `options`
 */

function Noun(context, options) {
  this.options = options || {};
  this.context = context || {};
  this.load(options);
  this.run(options);
}

Noun.prototype.set = function(key, value) {
  this.context[key] = value;
  return this;
};

Noun.prototype.get = function(key) {
  return this.context[key];
};

Noun.prototype.load = function() {
  this.plugins = plugins('noun-*', {
    cwd: process.cwd(),
    omit: 'noun'
  });
};

Noun.prototype.run = function(plugins) {
  plugins = plugins || this.plugins;
  var keys = Object.keys(plugins);
  var len = keys.length;
  var i = 0;

  while (i < len) {
    var fn = this.plugins[keys[i++]];
    this.use(fn, this.options);
  }
};

Noun.prototype.use = function(fn, options) {
  var opts = extend({}, this.options, options);
  fn.call(this, this.context, opts);
  return this;
};

module.exports = Noun;
