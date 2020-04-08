var authorize = {
  isAuth: function(req, res, next) {
    if(!req.isAuthenticated()) {
      return res.redirect('/');
    }else {
      next();
    }
  },
  isNotAuth: function(req, res, next) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }else {
      next();
    }
  }
};

module.exports = authorize;