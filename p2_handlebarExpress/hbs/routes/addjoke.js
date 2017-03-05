var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");
/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.storeJokeCount += 1;
  res.render('addjoke');
});

//this is meant for storejoke
router.post("/", function(req, res, next) {
  var joke = req.body.joke;
  jokes.addJoke(joke);
  res.redirect("/addjoke");
});

module.exports = router;