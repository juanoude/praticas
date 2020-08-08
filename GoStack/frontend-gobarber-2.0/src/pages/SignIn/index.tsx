import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/ToastContext';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const { user, signIn } = useAuth();

  // console.log(user);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      // console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Campo obrigatório')
            .email('Preencha com um email válido'),
          password: Yup.string().required('Campo obrigatório')
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro fatal!',
          description: 'Erro ao tentar efetuar o cadastro'
        });
      }
    },
    [addToast, history, signIn]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu Logon</h1>
            <Input
              type="text"
              icon={FiMail}
              name="email"
              placeholder="E-mail"
            />
            <Input
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Senha"
            />
            <Button type="submit"> Entrar </Button>
            <Link to="/forgot-password"> Esqueci minha senha </Link>
          </Form>

          <Link to="/signup">
            <FiLogIn size={20} />
            Cadastrar nova conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
