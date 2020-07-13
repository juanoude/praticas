import React, { useRef, useCallback, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/ToastContext';

import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

interface ProfileFormData {
  email: string;
  name: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const { user, signIn, updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        api
          .patch('/users/avatar', formData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then((response) => {
            updateUser(response.data);
            addToast({
              title: 'Avatar Atualizado',
              type: 'success'
            });
          });
      }
    },
    [addToast]
  );

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Campo Obrigatório')
          .min(6, 'Mínimo 6 dígitos'),
        email: Yup.string()
          .required('Campo obrigatório')
          .email('Preencha com um email válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val) => !!val,
          then: Yup.string().required().min(6)
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: (val) => !!val,
          then: Yup.string()
            .required()
            .min(6)
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })
      });

      await schema.validate(data, { abortEarly: false });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? { old_password, password, password_confirmation }
          : {})
      };

      api.put('/profile/update', formData).then((response) => {
        updateUser(response.data);
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
  }, []);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
              />
              <FiCamera />
            </label>
          </AvatarInput>

          <h2> Meu perfil</h2>
          <Input
            type="text"
            icon={FiUser}
            name="name"
            placeholder="Nome Completo"
          />
          <Input type="text" icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            type="password"
            icon={FiLock}
            name="old_password"
            placeholder="Senha atual"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Nova senha"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password_confirmation"
            placeholder="Confirmar da senha"
          />
          <Button type="submit"> Salvar </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
