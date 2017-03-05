
var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{username: req.session.username}) //<- template, not necessary to .hbs because it was setup in app.js that it is the default engine
});

router.get('/joke', function(req, res,next){
  req.session.jokeCount +=1;
  res.render('joke', jokes.getRandomJoke() );
});

router.get('/jokes', function(req, res,next){
  req.session.jokesCount +=1;
  res.render('jokes', { jokes: jokes.allJokes});
});

// router.post("/addjoke", function (req, res,next){
//   res.render('addjoke', '/storejoke')
// });

// router.get('/storejoke', function(req, res, next){
//   var newJoke =  req.body.joke;
//   jokes.addJoke(newJoke);
//   res.send("Success");
// });

module.exports = router;
