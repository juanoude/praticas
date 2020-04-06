var express = require('express');
var router = express.Router();
var passport = require('passport');

//var db = require('../db');
var mongoose = require('mongoose');

var isAuth = require('../middlewares/authorize').isAuth;
var isNotAuth = require('../middlewares/authorize').isNotAuth;

router.get('/', isAuth, (req, res, next) => {
  
  mongoose.model('Musica').find()
    .then( (musicas) => {
      res.render('index', { 
        musicas: musicas,
        session: req.session,
        usuario: req.user
      });
    }, next);
  
  // db("musicas").then((musicas) => {
  //   res.render('index', {
  //     musicas: musicas
  //   })
  // }, next);

});

router.get('/login', isNotAuth, (req, res, next) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/add', isAuth, (req, res, next) => {
  res.render('add');
});

router.post('/musica', isAuth, (req, res, next) => {
  var Musica = mongoose.model('Musica');
  var m = new Musica(req.body);

  m.save().then( (result) => {
    res.redirect('/');
  }, next);
  
  // db("musicas").insert(req.body).then((ids) => {
  //   res.redirect('/');
  // }, next);
});

router.get('/edit/:id', isAuth, (req, res, next) => {
  const {id} = req.params;

  mongoose.model('Musica').findOne({_id: id})
    .then( (musica) => {
      res.render('edit', { musica: musica });
    }, next);

  // db("musicas").where("id", id).first()
  //   .then((musica) => {
  //     if(!musica) {
  //       return res.send(400);
  //     }

  //     res.render('edit.njk', {
  //       musica: musica
  //     });
  //   }, next);
});

router.put('/edit/:id', isAuth, (req, res, next) => {
  const {id} = req.params;

  mongoose.model('Musica').update({_id: id}, {
    $set: {
      nome: req.body.nome,
      artista: req.body.artista,
      estrelas: req.body.estrelas
    }
  }).then( (musica) => {
    res.redirect('/');
  }, next);

  // db("musicas").where('id', id).update(req.body)
  //   .then((result) => {
  //     if(result === 0) {
  //       return res.send(400);
  //     }

  //     res.redirect('/');      
  //   }, next);

});

router.delete('/delete/:id', isAuth, (req, res, next) => {
  const {id} = req.params;

  mongoose.model('Musica').remove({_id: id})
    .then((musica) => {
      res.redirect('/');
    }, next);

  // db("musicas").where('id', id).delete()
  //   .then( (rows) => {
  //     if(rows === 0) {
  //       return res.send(400);
  //     }

  //     return res.redirect('/');
  //   },next);
});

module.exports = router;