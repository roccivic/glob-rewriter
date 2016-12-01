'use strict';

var globToRegExp = require('glob-to-regexp');

module.exports = function(path, locale, source, target) {
  if (typeof path !== 'string') {
    throw new Error('Path is not a string');
  } else if (typeof locale !== 'string') {
    throw new Error('Locale is not a string');
  }
  // Create source regexp
  var sourceRegexp = globToRegExp(source, {globstar: true});
  // Validate path against source
  var sourceRegexp = globToRegExp(source, {globstar: true});
  if (!sourceRegexp.test(path)) {
    throw new Error(
        'Source expression "' + source +
        '" does not match path "' + path + '"'
    );
  }
  // Match path against source regexp
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
