'use strict';

module.exports = [{
  source: 'ABC/***/CBA',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid glob'
},{
  source: 'ABC',
  target: '<LOCALE>/ABC/***/CBA',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid glob'
},{
  source: 'ABC',
  target: 'ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression is missing the "<LOCALE>" placeholder'
},{
  source: '/ABC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression is not a relative path'
},{
  source: 'ABC',
  target: '/<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression is not a relative path'
},{
  source: '"ABC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character "\""'
},{
  source: 'A<BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character "<"'
},{
  source: 'A>BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character ">"'
},{
  source: 'A|BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character "|"'
},{
  source: 'A:BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character ":"'
},{
  source: 'A?BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character "?"'
},{
  source: 'ABC\\CBA',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains an invalid character "\\"'
},{
  source: 'ABC',
  target: '<LOCALE>/"ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character "\""'
},{
  source: 'ABC',
  target: '<LOCALE>/A<BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character "<"'
},{
  source: 'ABC',
  target: '<LOCALE>/A>BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character ">"'
},{
  source: 'ABC',
  target: '<LOCALE>/A|BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character "|"'
},{
  source: 'ABC',
  target: '<LOCALE>/A:BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character ":"'
},{
  source: 'ABC',
  target: '<LOCALE>/A?BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character "?"'
},{
  source: 'ABC/CBA',
  target: '<LOCALE>\\ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains an invalid character "\\"'
}];
