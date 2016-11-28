[![Build Status](https://travis-ci.org/roccivic/glob-rewriter.svg)](https://travis-ci.org/roccivic/glob-rewriter)

# Glob rewriter

Rewrites paths, using two globs as patterns.

Replaces a mandatory placeholder in the target expression with the provided value. The mandatory placeholder is ```<LOCALE>```.

## Installation

```sh
$ npm install glob-rewriter --save
```

## Usage
```js
// Import the module
var rewriter = require('glob-rewriter');

// Set input parameters
var source = 'somefolder/**/*.js';
var target = 'some_other_folder/**/<LOCALE>/*.js';
var locale = 'ja_JP';
var path = 'somefolder/a/b/c/d/test.js';

// This will throw an exception if the input is deemed to be invalid
rewriter.validate(path, locale, source, target);

// This will actually rewrite the path
var rewritten = rewriter.rewrite(path, locale, source, target);

// prints: "some_other_folder/a/b/c/d/ja_JP/test.js"
console.log(rewritten);
```

## Unit tests
```sh
$ npm test
```
