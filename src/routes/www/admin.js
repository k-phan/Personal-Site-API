var express = require('express');
var router = express.Router();
var debug = require('debug')('routes-www-admin')

router.get('/', function(req, res, next) {
  res.send('Welcome');
});

router.get('/new-demo', function(req, res, next) {
  req.app.mongodb.models.Hashtag.create({ tag: 'food', description: 4552}, function(err, hashtag) {
    req.app.mongodb.models.AboutMe.create({ hashtags: [hashtag] }, function(err, aboutme) {
      if (err) {
        debug('Error pushing to Hashtag Array! ' + err);
        throw new Error('Error! ' + err);
      }
    })
  })

  return res.send('OK');
});

router.get('/new-demo-2', function(req, res, next) {
  req.app.mongodb.models.Hashtag.create({ tag: 'not food', description: 'chicken sucks'}, function(err, hashtag) {
    req.app.mongodb.models.AboutMe.findOne({}, function(err, aboutme) {
      aboutme.hashtags.push(hashtag);
      aboutme.save(function(err, aboutme) {
        if (err) {
          debug('Error pushing to Hashtag Array! ' + err);
          throw new Error('Error! ' + err);
        }
      })
    })
  })

  return res.send('OK')
});

router.get('/get-demo', function(req, res, next) {
  req.app.mongodb.models.AboutMe.findOne({}, function(err, aboutme) {
    if(aboutme !== null) {
      debug('Removed \'AboutMe\'');
      debug(aboutme);
      aboutme.remove();
      return res.send('OK');
    } else {
      return res.send('NOT OK');
    }
  });
});

router.get('/delete-hashtag', function(req, res, next) {
  req.app.mongodb.models.Hashtag.findOne({}, function(err, hashtag) {
    if(hashtag !== null) {
      debug('Removed \'Hashtag\'');
      debug(hashtag);
      hashtag.remove();
      return res.send('OK');
    } else {
      return res.send('NOT OK');
    }
  })
})



module.exports = router;
