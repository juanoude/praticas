import React from 'react';
import { Form } from '@unform/web';

import { FiMail, FiLock, FiUser, FiArrowLeftCircle } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1> Faça seu Cadastro</h1>
          <Input type="text" icon={FiUser} name="nome" placeholder="Nome" />
          <Input type="text" icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button type="submit"> Cadastrar </Button>
        </Form>

        <a href="cadastro">
          <FiArrowLeftCircle size={20} />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
