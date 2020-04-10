var express = require('express');
var passport = require('passport');
var router = express.Router();

var db = require('../db');

var isNotAuth = require('../middlewares/authorize').isNotAuth;

router.get('/login', isNotAuth, function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/register', isNotAuth, (req, res, next) => {
  res.render('register');
});

router.post('/register', isNotAuth, (req, res, next) => {
  db("users").insert(req.body).then((id) => {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  }, next);
});

module.exports = router;
