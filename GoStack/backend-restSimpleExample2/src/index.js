const express = require('express');
const app = express();
const {uuid, isUuid} = require('uuidv4');

app.use(express.json());

var projects = [];

function logRequest(req, res, next) {
  const {method, url} = req;

  console.log(`[${method}] - ${url}`);

  console.time();

  next();

  console.timeEnd();
}

function validateUuid(req, res, next) {
  const {id} = req.params;
  if(!isUuid(id)) {
    return res.status(401).json({error: 'Invalid ID'});
  }

  return next();
}

app.use(logRequest);

app.use('/projects/:id', validateUuid);

app.get('/projects', (req, res) => {

  const {title} = req.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(result);
});

app.post('/projects', (req, res) => {
  const {title, description} = req.body;
  const project = {id: uuid(), title, description};

  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const {id} = req.params;
  const {title, description} = req.body;

  // let project = projects.find((project) => {
  //   project.id === id;
  // });

  let indexOfId = projects.findIndex((project)=> project.id === id);

  if(indexOfId < 0) {
    return res.status(400).json({error: 'Not found project with this id'});
  }

  project = {
    id,
    title,
    description
  };

  projects[indexOfId] = project;

  return res.json(projects);

});

app.delete('/projects/:id', (req, res) =>{
  const {id} = req.params;

  let indexOfId = projects.findIndex((project) => project.id === id);

  if(indexOfId < 0) {
    return res.status(400).json({error: 'Not found project with this id'});
  }

  projects.splice(indexOfId, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀️ Servidor Truvando!')
});