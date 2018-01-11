'use strict';
var debug = require('debug')('mongoose-models-hashtag')

module.exports = function(connection, mongoose) {
  var Schema = mongoose.Schema;
  var Hashtag = new Schema({
    tag: String,
    description: String,
    image_url: String
  });

  Hashtag.pre('remove', function (next) {
    debug("AboutMe Pre-Remove Hook Fired");

    connection.models.AboutMe.update(
      { hashtags: this._id},
      { $pull: { hashtags: this._id } },
      { multi: true },
      function(err, data) {
        if(err) {
          debug('Error using $pull: ' + err);
          throw new Error('Error! ' + err);
        }
      }
    );

    debug("AboutMe Pre-Remove Hook Finished");
    next();
  });

  connection.model('Hashtag', Hashtag);
}