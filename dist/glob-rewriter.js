(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GlobRewriter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var validate = require('./lib/validate');
var rewrite = require('./lib/rewrite');

module.exports = {
  validate: validate,
  rewrite: function(path, locale, source, target) {
    validate(source, target);
    return rewrite(path, locale, source, target);
  }
};

},{"./lib/rewrite":3,"./lib/validate":4}],2:[function(require,module,exports){
'use strict';

module.exports = [
  '"',
  '<',
  '>',
  '|',
  ':',
  '?',
  '\\'
];

},{}],3:[function(require,module,exports){
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

},{"glob-to-regexp":5}],4:[function(require,module,exports){
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

},{"./invalid-chars":2,"glob-to-regexp":5}],5:[function(require,module,exports){
module.exports = function (glob, opts) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string');
  }

  var str = String(glob);

  // The regexp we are building, as a string.
  var reStr = "";

  // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.
  var extended = opts ? !!opts.extended : false;

  // When globstar is _false_ (default), '/foo/*' is translated a regexp like
  // '^\/foo\/.*$' which will match any string beginning with '/foo/'
  // When globstar is _true_, '/foo/*' is translated to regexp like
  // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
  // which does not have a '/' to the right of it.
  // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
  // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
  // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
  // globstar is _false_
  var globstar = opts ? !!opts.globstar : false;

  // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.
  var inGroup = false;

  // RegExp flags (eg "i" ) to pass in to RegExp constructor.
  var flags = opts && typeof( opts.flags ) === "string" ? opts.flags : "";

  var c;
  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
    case "\\":
    case "/":
    case "$":
    case "^":
    case "+":
    case ".":
    case "(":
    case ")":
    case "=":
    case "!":
    case "|":
      reStr += "\\" + c;
      break;

    case "?":
      if (extended) {
        reStr += ".";
	    break;
      }

    case "[":
    case "]":
      if (extended) {
        reStr += c;
	    break;
      }

    case "{":
      if (extended) {
        inGroup = true;
	    reStr += "(";
	    break;
      }

    case "}":
      if (extended) {
        inGroup = false;
	    reStr += ")";
	    break;
      }

    case ",":
      if (inGroup) {
        reStr += "|";
	    break;
      }
      reStr += "\\" + c;
      break;

    case "*":
      // Move over all consecutive "*"'s.
      // Also store the previous and next characters
      var prevChar = str[i - 1];
      var starCount = 1;
      while(str[i + 1] === "*") {
        starCount++;
        i++;
      }
      var nextChar = str[i + 1];

      if (!globstar) {
        // globstar is disabled, so treat any number of "*" as one
        reStr += ".*";
      } else {
        // globstar is enabled, so determine if this is a globstar segment
        var isGlobstar = starCount > 1                      // multiple "*"'s
          && (prevChar === "/" || prevChar === undefined)   // from the start of the segment
          && (nextChar === "/" || nextChar === undefined)   // to the end of the segment

        if (isGlobstar) {
          // it's a globstar, so match zero or more path segments
          reStr += "((?:[^/]*(?:\/|$))*)";
          i++; // move over the "/"
        } else {
          // it's not a globstar, so only match one path segment
          reStr += "([^/]*)";
        }
      }
      break;

    default:
      reStr += c;
    }
  }

  // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $
  if (!flags || !~flags.indexOf('g')) {
    reStr = "^" + reStr + "$";
  }

  return new RegExp(reStr, flags);
};

},{}]},{},[1])(1)
});