/*!
 * noun <https://github.com/jonschlinkert/noun>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Noun = require('./');
var noun = new Noun();

describe('noun', function () {
  describe('constructor defaults', function () {
    it('should load plugins from node_modules', function () {
      noun.plugins.should.have.property('one');
      noun.plugins.should.have.property('two');
      noun.plugins.should.have.property('three');
    });

    it('should allow plugins to extend `this`.', function () {
      noun.one.should.have.property('name', 'noun-one');
      noun.two.should.have.property('name', 'noun-two');
      noun.three.should.have.property('name', 'noun-three');
    });
  });

  describe('namespace', function () {
    it('should define a namespace', function () {
      var noun = new Noun('foo');
      noun.namespace.should.equal('foo');
    });

    it('should use the given namespace to load plugins from node_modules', function () {
      var noun = new Noun('noun');
      noun.plugins.should.have.property('one');
      noun.plugins.should.have.property('two');
      noun.plugins.should.have.property('three');
    });
  });

  describe('this', function () {
    it('should extend the `this` object with the given object.', function () {
      var noun = new Noun('app', {source: {yyy: 'zzz'}});
      noun.should.have.property('source', {yyy: 'zzz'});
    });

    it('should expose the `this` object to plugins.', function () {
      var noun = new Noun('app', {source: {yyy: 'zzz'}});
      noun.plugin(function () {
        this.should.have.property('source', {yyy: 'zzz'});
      })
    });
  });

  describe('.plugin()', function () {
    it('should run plugins in the order in which they are defined.', function () {
      var noun = new Noun('app', {source: {a: 'a'}});
      noun
        .plugin(function () {
          this.source.b = 'b';
        })
        .plugin(function () {
          this.source.c = 'c';
        })

      noun.source.should.have.property('a', 'a');
      noun.source.should.have.property('b', 'b');
      noun.source.should.have.property('c', 'c');
    });
  });

  describe('.loadPlugins()', function () {
    it('should allow local plugins to be loaded.', function () {
      noun.loadPlugins('fixtures/*.js');
      noun.plugins.should.have.property('a');
      noun.plugins.should.have.property('b');
      noun.plugins.should.have.property('c');
    });

    it('should return an object of plugins.', function () {
      var plugins = noun.loadPlugins('fixtures/*.js');
      plugins.should.have.property('a');
      plugins.should.have.property('b');
      plugins.should.have.property('c');
    });
  });

  describe('.run()', function () {
    it('should run plugins that are directly passed to the method.', function () {
      var plugins = noun.loadPlugins('fixtures/*.js');
      noun.run(plugins);

      noun.should.have.property('a', 'aaa');
      noun.should.have.property('b', 'bbb');
      noun.should.have.property('c', 'ccc');
    });
  });
});

