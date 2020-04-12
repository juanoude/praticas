import React, {useState, useEffect} from 'react';

import Header from './components/Header';

import api from './api';

function App() {

  let [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, [])

  async function handleAdd() {
    //projects.push(`Novo Projeto ${Date.now()}`);
    //setProjects([...projects, `Novo Projeto ${Date.now()}`])
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      description: 'Daquele jeito'
    });

    setProjects([...projects, response.data]);
  }

  return(
    <>
      <Header title="ReactJS">
        <ul>
          {projects.map(project => <li key={project.id}> {project.title} </li> )}
        </ul>
      </Header>

      <button type="button" onClick={handleAdd}> Adicionar Novo Projeto </button>
    </>
  ); 
}

export default App;