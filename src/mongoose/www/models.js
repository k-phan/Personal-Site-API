'use strict';

var debug = require('debug')('mongoose-models-www');

var aboutme = require('./models/about_me.js');
var experience = require('./models/experience.js');
var hashtag = require('./models/hashtag.js');
var job = require('./models/job.js');
var project = require('./models/project.js');

module.exports = function(connection, mongoose) {

  debug("Found \'www\' Schemas");
  
  aboutme(connection, mongoose);
  experience(connection, mongoose);
  hashtag(connection, mongoose);
  job(connection, mongoose);
  project(connection, mongoose);
  
  debug("Imported \'www\' Schemas to Mongoose");
}