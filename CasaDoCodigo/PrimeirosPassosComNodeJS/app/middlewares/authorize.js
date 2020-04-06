var authorize = {
  isAuth: function(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    }else {
      res.redirect('/login');
    }
  },

  isNotAuth: function(req, res, next) {
    if(!req.isAuthenticated()) {
      next();
    }else {
      res.redirect('/');
    }
  } 
};

module.exports = authorize;