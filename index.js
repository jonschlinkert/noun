/*!
 * noun <https://github.com/jonschlinkert/noun>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var load = require('load-plugins');

/**
 * Create an instance of `Noun` using the given
 * `namespace`.
 *
 * ```js
 * var Noun = require('noun');
 * var noun = new Noun('foo');
 * ```
 *
 * @param {Object} `options`
 * @api public
 */

function Noun(namespace, source) {
  this._namespace = namespace || 'noun';
  extend(this, source || {});
  this.plugins = {};
  this.loadPlugins();
  this.run();
}

/**
 * Define a Noun plugin.
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
    fn.apply(this, [].slice.call(arguments, 1));
  }
  return this;
};

/**
 * Called in the constructor to load plugins from `node_modules`
 * using the given `namespace`. For example, the namespace `foo`
 * will load plugins from the `foo-*` glob pattern.
 *
 * You may also call the `.loadPlugins()` method directly.
 *
 * ```js
 * noun.loadPlugins('baz-*');
 * ```
 *
 * @param  {String} `pattern` Optionally pass a glob pattern when calling the method directly.
 * @return {Object} Returns an object of plugins loaded from `node_modules`.
 * @api public
 */

Noun.prototype.loadPlugins = function(pattern) {
  var name = pattern || this._namespace + '-*';

  extend(this.plugins, load(name, {
    omit: this._namespace,
    cwd: process.cwd()
  }));

  return this.plugins;
};

/**
 * Run an object of plugins. By default, the `.run()` method
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
 * noun.run({'myPlugin': [function]});
 * ```
 *
 * @param  {Object} `fns` Object of plugins.
 * @api public
 */

Noun.prototype.run = function(plugins) {
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
  var args = [].slice.call(arguments, 1);
  if (o == null) {
    return {};
  }
  if (objects == null) {
    return o;
  }

  var len = args.length;

  for (var i = 0; i < len; i++) {
    var obj = args[i];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
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
