var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs  = require('express-hbs');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


// app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use( express .static(path.join(__dirname, 'public')));



app.get('/', function(req, res){
res.send('hello world');
});

var names = [];
app.get('/form', function (req, res) {
res.send("Hi: "+names.join(",")+"<form method='post'><input name='name'><button type=\"submit\">Submit</button> </form>");
});

app.post('/form', function (req, res) {
names.push(req.body.name);
res.redirect('/form');
});

app.get("/homerender", function (req, res){
  res.render('home');
});

app.use(function (req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err); //Make sure you understand this line
});

// will print stacktrace
if (app.get('env') === 'development') {
app.use(function (err, req, res, next) {
res.status(err.status || 500);
res.send("<h1>Sorry there was a problem: " + err.message + "</h1><p>" + err.stack + "</p>");
});
}
//Will not print stacktrace
app.use(function (err, req, res, next) {
res.status(err.status || 500);
res.send("<h1>Sorry there was a problem: " + err.message + "</h1><p>" + err.message + "</p>");
});


module.exports = app;