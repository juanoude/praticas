var express = require('express');

//var db = require('../db');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', (req, res, next) => {
  mongoose.model('Musica').find()
    .then( (musicas) => {
      res.render('index', { musicas: musicas });
    }, next);
  
  // db("musicas").then((musicas) => {
  //   res.render('index', {
  //     musicas: musicas
  //   })
  // }, next);

});

router.get('/add', (req, res, next) => {
  res.render('add');
});

router.post('/', (req, res, next) => {
  var Musica = mongoose.model('Musica');
  var m = new Musica(req.body);

  m.save().then( (result) => {
    res.redirect('/');
  }, next);
  
  // db("musicas").insert(req.body).then((ids) => {
  //   res.redirect('/');
  // }, next);
});

router.get('/edit/:id', (req, res, next) => {
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

router.put('/edit/:id', (req, res, next) => {
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

router.delete('/delete/:id', (req, res, next) => {
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