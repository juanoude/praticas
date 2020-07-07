import React, { useRef, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiArrowLeftCircle, FiMail } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/ToastContext';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  // console.log(user);

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    // console.log(data);
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Campo obrigatório')
          .email('Preencha com um email válido')
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/password/forgot', { email: data.email });

      addToast({
        type: 'success',
        title: 'Email Enviado',
        description:
          'Um email de confirmação foi enviado, verifique sua caixa de entrada'
      });

      // history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Erro ao tentar enviar o email'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Recupere sua Senha</h1>
            <Input
              type="text"
              icon={FiMail}
              name="email"
              placeholder="E-mail"
            />
            <Button loading={loading} type="submit">
              Enviar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeftCircle size={20} />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
