/*!
 * noun <https://github.com/jonschlinkert/noun>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var load = require('load-plugins');
var slice = require('array-slice');

/**
 * Create an instance of `Noun` with the given `namespace`.
 *
 * ```js
 * var Noun = require('noun');
 * var noun = new Noun('foo');
 * ```
 *
 * @param {Object} `namespace` Used to automatically load plugins from node_modules.
 * @param {Object} `source` Pass an object to directly extend the `this` object.
 * @api public
 */

function Noun(namespace, source) {
  this.namespace = namespace || 'noun';
  extend(this, source || {});
  this.plugins = {};
  this.loadPlugins();
  this.runPlugins();
}

/**
 * Define a plugin.
 *
 * ```js
 * noun
 *   .plugin(foo())
 *   .plugin(bar())
 *   .plugin(baz())
 * ```
 *
 * @param  {Function} `fn` The function to call.
 * @return {Object} Returns `Noun` for chaining.
 * @api public
 */

Noun.prototype.plugin = function(fn) {
  if (fn && typeof fn === 'function') {
    fn.apply(this, slice(arguments, 1));
  }
  return this;
};

/**
 * Load plugins.
 *
 * Called in the constructor to load plugins from `node_modules`
 * using the given `namespace`, but you may also call the method
 * directly.
 *
 * For example, the namespace `foo` would load plugins using the
 * `foo-*` glob pattern, e.g:
 *
 * ```js
 * noun.loadPlugins('foo-*');
 * ```
 *
 * @param  {String} `pattern` Optionally pass a glob pattern when calling the method directly.
 * @return {Object} Returns an object of plugins loaded from `node_modules`.
 * @api public
 */

Noun.prototype.loadPlugins = function(pattern) {
  var name = pattern || this.namespace + '-*';

  extend(this.plugins, load(name, {
    omit: this.namespace,
    cwd: process.cwd()
  }));

  return this.plugins;
};

/**
 * Run an object of plugins. By default, the `.runPlugins()` method
 * is called in the constructor, but it may also be used directly.
 *
 * When used directly, each plugin is a key-value pair, where the
 * key is the plugin name, and the value is the function to be called.
 *
 * Currently, the plugin name is useless, so this could have
 * been setup to take an array. However, there are plans to
 * add additional features to take advantage of this configuration.
 *
 * **Example:**
 *
 * ```js
 * noun.runPlugins({'myPlugin': [function]});
 * ```
 *
 * @param  {Object} `fns` Object of plugins.
 * @api public
 */

Noun.prototype.runPlugins = function(plugins) {
  plugins = plugins || this.plugins;
  var keys = Object.keys(plugins);

  for (var i = 0; i < keys.length; i++) {
    this.plugin.call(this, plugins[keys[i]], this);
  }
};

/**
 * Extend `o` with properties from other objects.
 *
 * @param  {Object} `o`
 * @param  {Object} `objects`
 * @return {Object}
 */

function extend(o, objects) {
  var args = slice(arguments, 1);
  if (o == null) {
    return {};
  }
  if (objects == null) {
    return o;
  }

  var len = args.length;
  var i = 0;

  while (len--) {
    var obj = args[i++];
    for (var key in obj) {
      if (Boolean(obj[key])) {
        o[key] = obj[key];
      }
    }
  }
  return o;
}

/**
 * Expose `Noun`
 */

module.exports = Noun;
