router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/home');
  }else {
    res.render('login');
  }
});

router.post('/', passport.authenticate('local', {
  sucessRedirect: '/home',
  failureRedirect: '/error'
}));

router.get('/home', function (req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/');
  }else {
    res.render('/home', {
      session: req.session,
      usuario: req.user
    });
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});