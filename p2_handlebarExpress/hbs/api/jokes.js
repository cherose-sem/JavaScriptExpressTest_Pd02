var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");
/* GET home page. */
router.get('/', function(req, res, next) {
  var arr = jokes.allJokes;
  var jk = JSON.stringify(arr);
  res.send(jk);
});


module.exports = router;