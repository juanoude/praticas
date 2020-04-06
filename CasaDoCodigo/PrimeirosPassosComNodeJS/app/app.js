var express = require('express');
var path = require('path');
var createError = require('http-errors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
require('./passport');

var expressNunjucks = require('express-nunjucks');


var indexRouter = require('./routes/musicas');
var methodOverride = require('method-override');

require('./models/musics');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/musics')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
var njk = expressNunjucks(app, {watch: true, noCache: true});

//express-session config
app.use(session({
  secret: 'teste sessoes',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Method override config
app.use(methodOverride(function(req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
});

module.exports = app;
