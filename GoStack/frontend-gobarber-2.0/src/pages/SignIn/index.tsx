import React from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

const SigIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1> Faça seu Logon</h1>
          <input type="text" name="user" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Senha" />
          <button type="submit"> Entrar </button>
          <a href="nada"> Esqueci minha senha </a>
        </form>

        <a href="cadastro">
          {' '}
          <FiLogIn size={20} /> Cadastrar nova conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SigIn;
