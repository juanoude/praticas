import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiMail, FiLock, FiUser, FiArrowLeftCircle } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    // console.log(data);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo Obrigatório'),
        email: Yup.string()
          .required('Campo obrigatório')
          .email('Preencha com um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos')
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1> Faça seu Cadastro</h1>
          <Input type="text" icon={FiUser} name="name" placeholder="Nome" />
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
