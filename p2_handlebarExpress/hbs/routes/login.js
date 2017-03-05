var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.jokeCount = 0;
  req.session.jokesCount = 0;
  req.session.storeJokeCount = 0;
  res.render('login');
});

module.exports = router;