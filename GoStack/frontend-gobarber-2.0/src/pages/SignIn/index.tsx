import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SigIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1> Faça seu Logon</h1>
          <Input type="text" icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button type="submit"> Entrar </Button>
          <a href="nada"> Esqueci minha senha </a>
        </form>

        <a href="cadastro">
          <FiLogIn size={20} />
          Cadastrar nova conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SigIn;