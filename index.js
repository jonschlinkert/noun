/*!
 * noun <https://github.com/jonschlinkert/noun>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var forOwn = require('for-own');
var plugins = require('load-plugins');
var extend = require('./extend');

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
  this.plugins = plugins('noun-*');
};

Noun.prototype.run = function(plugins) {
  plugins = plugins || this.plugins;
  var keys = Object.keys(plugins);
  var len = keys.length;
  var i = 0;
  while (i < len) {
    var fn = this.plugins[keys[i++]];
    this.use(fn, this.options);
  };
};

Noun.prototype.use = function(fn, options) {
  var opts = extend({}, this.options, options);
  fn.call(this, this.context, opts);
  return this;
};

module.exports = Noun;

var noun = new Noun({});

noun
  .use(function() {
    this.context.aaa = this.context.foo;
  })
  .use(function() {
    this.context.bbb = this.context.bar;
  })
  .use(baz({what: 'whhhhhaaaa?'}))

function baz(options) {
  return function () {
    // console.log(this.plugins)
    // this.run({add: 'blah'})
    this.context.ccc = this.context.baz;
  }
}
console.log(noun);