var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");
/* GET home page. */
router.post("/", function(req, res, next) {
  var joke = req.body.joke;
  jokes.addJoke(joke);
  res.send("");
});

module.exports = router;