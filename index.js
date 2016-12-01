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
