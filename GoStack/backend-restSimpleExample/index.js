const express = require('express');
const server = express();

server.use(express.json());

const projects = [
  {id: "1", title:"Primeiro Projeto", tasks:['Tarefa padrão']},
  {id: "2", title:"Segundo Projeto", tasks:['Tarefa padrão']},
  {id: "3", title:"Primeiro Projeto", tasks:['Tarefa padrão']}
];

var reqCount = 0;

server.use((req, res, next) => {
  reqCount++;
  next();
  console.log(reqCount);
});

function checkProjectId (req, res, next) {
  let id = req.params.id;

  if(!projects.find(project => project.id == id)) {
    return res.status(400).json({ error: 'Este projeto não existe' });
  }
  return next();
}

server.post('/projects', (req, res) => {
  let {id, title} = req.body;
  let project = {id, title, tasks: []};
  projects.push(project);
  return res.json(projects); 
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectId, (req, res) => {
  let {id} = req.params;
  let {title} = req.body;
  
  projects.forEach((project) => {
    if(id == project.id){
      project.title = title;
    }
  });

  return res.json(projects);

});

server.delete('/projects/:id', checkProjectId, (req, res) => {
  let {id} = req.params;

  let projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);
  
  return res.send();
});

server.post('/projects/:id/tasks', checkProjectId, (req, res) => {
  let {id} = req.params;
  let {title} = req.body;

  let project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.json(projects);

});

server.listen(3000);