'use strict';

module.exports = [{
  source: null,
  target: 'ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression is not a string'
}, {
  source: 'ABC',
  target: null,
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression is not a string'
}, {
  source: 'ABC',
  target: 'ABC',
  locale: null,
  path: 'ABC',
  error: 'Locale is not a string'
}, {
  source: 'ABC',
  target: 'ABC',
  locale: 'ABC',
  path: null,
  error: 'Path is not a string'
}];
