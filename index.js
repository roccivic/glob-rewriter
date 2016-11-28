'use strict';

var validate = require('./lib/validate');
var rewrite = require('./lib/rewrite');

module.exports = {
  validate: validate,
  rewrite: function() {
    validate.apply(this, arguments);
    return rewrite.apply(this, arguments);
  }
};
