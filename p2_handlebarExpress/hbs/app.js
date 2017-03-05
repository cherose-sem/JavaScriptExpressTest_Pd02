var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var index = require('./routes/index');
var users = require('./routes/users');
var addjoke = require('./routes/addjoke');
var login = require('./routes/login');

var apiRandomJoke = require('./api/random');
var apiAllJokes = require('./api/jokes');
var apiAddJoke = require('./api/joke');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //directs to the folder of views
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

app.use(function (req, res, next) {
  var sess = req.session
  if (sess.username) { //check if the username has been added to the session
    return next(); //user has logged-in
  }
  if (req.url.startsWith("/api/")) {
    // var err = new Error('Unauthorized');
    // err.status = 401;
    // return next(err);
    return next();
  }
  var userName = req.body.username
  if (userName) { //if user found, store in session
    sess.username = userName;
    return res.redirect("/");
  }
  //if no username found
  req.url = "/login";
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/addjoke', addjoke);
app.use('/login', login);

//RESTless api
app.use('/api/joke/random', apiRandomJoke);
app.use('/api/jokes', apiAllJokes);
app.use('/api/joke', apiAddJoke);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
