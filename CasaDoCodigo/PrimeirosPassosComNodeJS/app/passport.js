var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username);
  db("users").where("name", username).first()
    .then((user) => {
      console.log(user);
      console.log(req);
      if(!user || user.password !== password) {
        return done(null, false);
      }else {
        done(null, user);
      }
    }, done);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db("users").where("id", id).first()
    .when((user) => {
      done(null, user);
    }, done);
});