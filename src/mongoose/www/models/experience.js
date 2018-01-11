'use strict';

var debug = require('debug')('mongoose-models-experience')

module.exports = function(connection, mongoose) {
  var Schema = mongoose.Schema;
  var Experience = new Schema({
    skills_reg: [String],
    skills_exp: [String],
    jobs: [ { type: Schema.Types.ObjectId, ref: 'Job' } ]
  });

  Experience.pre('remove', function (next) {
    debug("Experience Pre-Remove Hook Fired");

    connection.models.Job.remove({ _id: { $in: this.jobs } }, function (err) {
      if (err) {
        debug('Error! ' + err);
        throw new Error('Experience Pre-Remove Failed: ' + err);
      }
    });

    debug("Experience Pre-Remove Hook Fired");
    next();
  });

  connection.model('Experience', Experience);
}