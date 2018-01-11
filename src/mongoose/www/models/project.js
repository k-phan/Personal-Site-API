'use strict';

module.exports = function(connection, mongoose) {
  var Schema = mongoose.Schema;
  var Project = new Schema({
    title: String,
    technology: [String],
    image_url: String,
    date_start: { type: Date, default: Date.now },
    date_end: { type: Date, default: Date.now },
    ongoing: { type: Boolean, default: false },
    description: String,
    source_link: String,
    demo_link: { 
      display: String,
      url: String
    }
  });

  connection.model('Project', Project);
}