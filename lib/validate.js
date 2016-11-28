'use strict';

var globToRegExp = require('glob-to-regexp');
var invalidChars = require('./invalid-chars');

function tokenise(string) {
  var tokens = [];
  for (var i = 0; i < string.length; i++) {
    var curr = string[i];
    var next = string[i + 1];
    if (curr === '*') {
      if (next === '*') {
        i++;
        tokens.push('**');
      } else {
        tokens.push('*');
      }
    }
  }
  return tokens;
}

function tokensMatch(source, target) {
  if (source.length !== target.length) {
    return false;
  }
  for (var i = 0; i < source.length; i++) {
    if (source[i] !== target[i]) {
      return false;
    }
  }
  return true;
}

function globsMatch(source, target) {
  return tokensMatch(
      tokenise(source),
      tokenise(target)
  );
}

function contains(haystack, needles) {
  for (var i = 0; i < needles.length; i++) {
    var needle = needles[i];
    if (haystack.indexOf(needle) !== -1) {
      return true;
    }
  }
}

module.exports = function(path, locale, source, target) {
  // Validate input
  if (typeof path !== 'string') {
    throw new Error('Path is not a string');
  } else if (typeof locale !== 'string') {
    throw new Error('Locale is not a string');
  } else if (typeof source !== 'string') {
    throw new Error('Source expression is not a string');
  } else if (typeof target !== 'string') {
    throw new Error('Target expression is not a string');
  } else if (/\*{3,}/.test(source)) {
    throw new Error('Source expression is malformed');
  } else if (/\*{3,}/.test(target)) {
    throw new Error('Target expression is malformed');
  } else if (contains(source, invalidChars)) {
    throw new Error('Source expression contains one or more invalid characters');
  } else if (contains(target.replace('<LOCALE>', ''), invalidChars)) {
    throw new Error('Target expression contains one or more invalid characters');
  } else if (source[0] === '/') {
    throw new Error('Source expression is not relative');
  } else if (target[0] === '/') {
    throw new Error('Target expression is not relative');
  } else if (!/<LOCALE>/.test(target)) {
    throw new Error('Placeholder is missing from the target expression');
  }

  // Validate source against target
  if (!globsMatch(source, target)) {
    throw new Error(
        'Globs in source expression "' + source +
        '" do not match globs in target expression "' + target + '"'
    );
  }

  // Validate path against source
  var sourceRegexp = globToRegExp(source, {globstar: true});
  if (!sourceRegexp.test(path)) {
    throw new Error(
        'Source expression "' + source +
        '" does not match path "' + path + '"'
    );
  }
};
