const http = require('http');

const servidor = http.createServer(function (req, res) {

  let html = '';

  if(req.url == '/') {
    html = '<h1> Você acessou o diretório raiz </h1>';
  }else if(req.url == '/livros') {
    html = '<h1> Você acessou o diretório de livros </h1>';
  }

  res.end(html);

});
servidor.listen(3000);
