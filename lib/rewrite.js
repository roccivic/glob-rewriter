'use strict';

var globToRegExp = require('glob-to-regexp');

module.exports = function(path, locale, source, target) {
  var sourceRegexp = globToRegExp(source, {globstar: true});
  var matches = sourceRegexp.exec(path);
  // Get rid of the first match, it's the whole string
  matches.shift();
  // Perform substitution
  var retval = '';
  var matchIndex = 0;
  for (var i = 0; i < target.length; i++) {
    var curr = target[i];
    var next = target[i + 1];
    var match = matches[matchIndex];
    if (curr === '*') {
      if (next === '*') {
        i++;
      }
      retval += match;
      matchIndex++;
    } else {
      retval += curr;
    }
  }
  // Normalise double slashes
  retval = retval.replace(/\/+/g, '/');
  // Ensure paths are relative
  if (retval.charAt(0) === '/') {
    retval = retval.substring(1);
  }
  // Substitute locale into path
  retval = retval.replace('<LOCALE>', locale);
  return retval;
};
