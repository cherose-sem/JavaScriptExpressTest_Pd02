
var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");
/* GET home page. */
router.get('/', function(req, res, next) {
  var obj = {joke: jokes.getRandomJoke()};
  var jk = JSON.stringify(obj);
  res.send(jk);
});

module.exports = router;