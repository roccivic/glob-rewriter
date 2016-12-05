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
      return needle;
    }
  }
}

module.exports = function(source, target) {
  // Validate input
  if (typeof source !== 'string') {
    throw new Error('Source expression is not a string');
  } else if (typeof target !== 'string') {
    throw new Error('Target expression is not a string');
  } else if (/\*{3,}/.test(source)) {
    throw new Error('Source expression contains an invalid glob');
  } else if (/\*{3,}/.test(target)) {
    throw new Error('Target expression contains an invalid glob');
  }
  var cs = contains(source, invalidChars);
  var ct = contains(target.replace('<LOCALE>', ''), invalidChars);
  if (cs) {
    throw new Error('Source expression contains an invalid character "' + cs + '"');
  } else if (ct) {
    throw new Error('Target expression contains an invalid character "' + ct + '"');
  } else if (source[0] === '/') {
    throw new Error('Source expression is not a relative path');
  } else if (target[0] === '/') {
    throw new Error('Target expression is not a relative path');
  } else if (!/<LOCALE>/.test(target)) {
    throw new Error('Target expression is missing the "<LOCALE>" placeholder');
  }
  // Validate source against target
  if (!globsMatch(source, target)) {
    throw new Error(
        'Globs in source expression do not match globs in target expression'
    );
  }
};
