'use strict';

module.exports = [{
  source: 'ABC/***/CBA',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression is malformed'
},{
  source: 'ABC',
  target: '<LOCALE>/ABC/***/CBA',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression is malformed'
},{
  source: 'ABC',
  target: 'ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Placeholder is missing from the target expression'
},{
  source: '/ABC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression is not relative'
},{
  source: 'ABC',
  target: '/<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression is not relative'
},{
  source: '"ABC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'A<BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'A>BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'A|BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'A:BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'A?BC',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'ABC\\CBA',
  target: '<LOCALE>/ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Source expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/"ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/A<BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/A>BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/A|BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/A:BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC',
  target: '<LOCALE>/A?BC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
},{
  source: 'ABC/CBA',
  target: '<LOCALE>\\ABC',
  locale: 'ABC',
  path: 'ABC',
  error: 'Target expression contains one or more invalid characters'
}];
