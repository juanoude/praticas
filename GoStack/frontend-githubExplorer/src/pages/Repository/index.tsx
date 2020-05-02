import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';
import { Header, RepositoryInfo } from './styles';

import logoImg from '../../assets/logo.svg';
import repoImg from '../../assets/photo3.jpeg';

interface RouteParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer"/>

        <Link to='/'>
          <FiChevronLeft size={20} />
          <span> Voltar a página </span>
        </Link>

      </Header>

      <RepositoryInfo>
        <header>
          <img src={repoImg} alt="Repository photo"/>
            <div>
              <strong> Repository </strong>
              <p> {params.repository} </p>
            </div>
        </header>

        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>




    </>
  );
}

export default Repository;
