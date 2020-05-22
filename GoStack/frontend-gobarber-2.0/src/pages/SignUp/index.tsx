import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiArrowLeftCircle } from 'react-icons/fi';
import api from '../../services/api';

import { useToast } from '../../hooks/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  password: string;
  email: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo Obrigatório'),
        email: Yup.string()
          .required('Campo obrigatório')
          .email('Preencha com um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos')
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      history.push('/');

      addToast({
        title: 'Cadastro efetuado com sucesso',
        description: 'Você já pode efetuar seu login no GoBarber',
        type: 'success'
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        title: 'Erro no cadastro',
        description:
          'Ocorreu um erro ao tentar efetuar o cadastro, tente novamente.',
        type: 'error'
      });
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu Cadastro</h1>
            <Input type="text" icon={FiUser} name="name" placeholder="Nome" />
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
            <Button type="submit"> Cadastrar </Button>
          </Form>

          <Link to="/">
            <FiArrowLeftCircle size={20} />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
