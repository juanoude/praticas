import React, { useState, FormEvent, useEffect } from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import {Title, Form, Repositories, ErrorFlash} from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [errorFlash, setErrorFlash] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const repositoriesOnStorage = localStorage.getItem('@Githubexplorer:repositories');
    if (repositoriesOnStorage) {
      return JSON.parse(repositoriesOnStorage);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@Githubexplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo || newRepo.length < 3) {
      setErrorFlash('Digite o autor/nome do Repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setErrorFlash('');
    }catch(error) {
      setErrorFlash('Erro ao buscar o repositório, cheque o nome e tente novamente');
    }


  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!errorFlash} // Same as boolean(errorFlash)
        onSubmit={handleAddRepository}>
        <input type="text"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"/>

        <button type="submit"> Pesquisar </button>
      </Form>

      { errorFlash && <ErrorFlash> {errorFlash} </ErrorFlash> } {/* Same as if(errorFlash) ... */}

      <Repositories>

        {repositories.map( repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong> {repository.full_name} </strong>
              <p> {repository.description} </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}

      </Repositories>


    </>
  );
}

export default Dashboard;
