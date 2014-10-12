'use strict';

/**
 * Extend object a with properties from other objects.
 *
 * @param  {Object} `o`
 * @param  {Object} `objects`
 * @return {Object}
 */

module.exports = function extend(o, objects) {
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
};