import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import api from '../../services/api';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';
import repoImg from '../../assets/photo3.jpeg';

interface RouteParams {
  repository: string;
}

interface Repository {
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  }
  full_name: string;
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  }
}


const Repository: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    api.get<Repository>(`/repos/${params.repository}`).then((response) =>  {
      setRepository(response.data);
    }, null);

    api.get<Issue[]>(`/repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer"/>
        <Link to='/'>
          <FiChevronLeft size={20} />
          <span> Voltar a página </span>
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt="Repository photo"/>
              <div>
                <strong> {repository.full_name} </strong>
                <p> {repository.description} </p>
              </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong> {repository.forks_count} </strong>
              <span>Forks</span>
            </li>
            <li>
              <strong> {repository.open_issues_count} </strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong> {issue.title} </strong>
              <p> {issue.user.login} </p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
}

export default Repository;
