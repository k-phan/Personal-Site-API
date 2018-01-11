var mongoose = require('mongoose');
var debug = require('debug')('mongoose-connection');

var uri = ('mongodb://' + process.env.MONGO_IP + ':' + process.env.MONGO_PORT + '/'
  + process.env.MONGO_WWW_DB_NAME);

var options = {
  useMongoClient: true,
  keepAlive: true
};

module.exports = mongoose.connect(uri, options, function (err) {
  if(err) {
    debug('Error! ' + err);
    throw new Error('MongoDB connection failed: ' + err);
  }
  debug('Connection created');
});