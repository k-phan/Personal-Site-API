'use strict';
var debug = require('debug')('mongoose-models-aboutme')

module.exports = function(connection, mongoose) {
  var Schema = mongoose.Schema;
  var AboutMe = new Schema({
    image_url: String,
    hashtags: [ { type: Schema.Types.ObjectId, ref: 'Hashtag' } ]
  });

  AboutMe.pre('remove', function(next) {
    debug("AboutMe Pre-Remove Hook Fired");

    connection.models.Hashtag.remove({ _id: this.hashtags }, function(err) {
      if (err) {
        debug('Error! ' + err);
        throw new Error('Error Removing Hashtags ' + err);
      }
    });

    debug("AboutMe Pre-Remove Hook Finished");

    next();
  });

  connection.model('AboutMe', AboutMe);
}