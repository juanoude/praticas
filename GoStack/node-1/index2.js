const express = require('express');

const server = express();
server.use(express.json());

server.get('/teste', (req, res) => {
  return res.json({ message: 'Hello World' });
  //return res.send('Hello World');
  //console.log("teste");
});

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Method:${req.method}/ URL:${req.url}`);
  next();
  console.timeEnd('Request');
});



const users = ['Juan', 'Angélica', 'Mimi'];


server.get('/users', (req, res) => {
  const index = req.query.index;
  if(!index) {
    return res.json(users);
  }
  return res.json(users[index]);
});

function checkIndexUsers (req, res, next) {
  let user = users[req.params.index];
  if(!user){
    return res.status(400)
      .json({Error: 'User index doen\'nt exist'});
  }
  req.user = user;
  return next();
}

function checkNameKey(req, res, next) {
  let {name} = req.body;
  if(!name) {
    return res.status(400)
      .json({Error: 'Name key not found'});
  }
  return next();
}

server.get('/users/:index', checkIndexUsers, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkNameKey, (req, res) => {
  const {name} = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index', checkNameKey, checkIndexUsers, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  
  users[index] = name;
  return res.json(users);
});

server.delete('/users/:index', checkIndexUsers, (req, res) => {
  const {index} = req.params;

  users.splice(index, 1);

  return res.send();
});



server.listen(3000);