'use strict';

var debug = require('debug')('mongoose-models-init')

var www = require('./www/models.js');

module.exports = function(connection, mongoose) {
  
  debug('Importing Schemas...');

  www(connection, mongoose);
  
  debug('Finished Importing Schemas');
}