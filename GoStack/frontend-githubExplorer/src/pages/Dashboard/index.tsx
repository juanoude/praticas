import React from 'react';

import {Title, Form, Repositories} from './styles';
import logoImg from '../../assets/logo.svg';
import profilePhoto from '../../assets/photo3.jpeg';
import { FiChevronRight } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore Repositórios no Github</Title>

      <Form action="#">
        <input type="text" placeholder="Digite o nome do repositório"/>
        <button type="submit"> Pesquisar </button>
      </Form>

      <Repositories>
        <a href="#">
          <img src={profilePhoto} alt="profile image"/>
          <div>
            <strong>juanoude/ribon-challenge</strong>
            <p> Nice challenge from a nice job interview</p>
          </div>
          <FiChevronRight size={20} />
        </a>

        <a href="#">
          <img src={profilePhoto} alt="profile image"/>
          <div>
            <strong>juanoude/ribon-challenge</strong>
            <p> Nice challenge from a nice job interview</p>
          </div>
          <FiChevronRight size={20} />
        </a>

        <a href="#">
          <img src={profilePhoto} alt="profile image"/>
          <div>
            <strong>juanoude/ribon-challenge</strong>
            <p> Nice challenge from a nice job interview</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>


    </>
  );
}

export default Dashboard;
