'use strict';

var debug = require('debug')('mongoose-models-job');

module.exports = function(connection, mongoose) {
  var Schema = mongoose.Schema;
  var Job = new Schema({
    title: String,
    responsibilities: [String],
    company: String,
    location: String,
    date_start: { type: Date, default: Date.now },
    date_end: { type: Date, default: Date.now },
    ongoing: { type: Boolean, default: false }
  });

  Job.pre('remove', function (next) {
    debug("Job Pre-Remove Hook Fired");

    connection.models.Experience.update(
      { jobs: this._id },
      { $pull: { jobs: this._id } },
      { multi: true },
      function(err, data) {
        if (err) {
          debug('Error using $pull: ' + err);
          throw new Error('Error! ' + err);
        }
      }
    );

    debug("AboutMe Pre-Remove Hook Finished");
    next();
  });

  connection.model('Job', Job);
}