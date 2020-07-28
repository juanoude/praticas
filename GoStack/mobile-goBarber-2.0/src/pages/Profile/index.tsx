import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  Avatar,
  IconContainer,
  AvatarContainer,
  AvatarButton
} from './styles';
import { useAuth } from '../../hooks/AuthContext';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { user } = useAuth();

  const handleSignUp = useCallback(async (data) => {
    // console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
          .required('Campo obrigatório')
          .email('Preencha com um email válido'),
        password: Yup.string().min(6, 'Deve conter no mínimo 6 dígitos')
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso',
        'efetue o login com o usuário e senha criados'
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert('Erro na autenticação', 'cheque os dados e tente novamente');
    }
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#312e38' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <IconContainer onPress={handleBack}>
            <Icon name="chevron-left" size={30} color="#999591" />
          </IconContainer>
          <AvatarContainer>
            <Avatar source={{ uri: user.avatar_url }} />
            <AvatarButton>
              <Icon name="camera" size={25} />
            </AvatarButton>
          </AvatarContainer>

          <Title> Perfil </Title>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              icon="user"
              name="name"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputEmailRef.current?.focus();
              }}
            />
            <Input
              ref={inputEmailRef}
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
              name="email"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={oldPasswordRef}
              containerStyle={{ marginTop: 23 }}
              autoCapitalize="none"
              secureTextEntry
              icon="lock"
              name="old_password"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordRef.current?.focus();
              }}
            />

            <Input
              ref={newPasswordRef}
              autoCapitalize="none"
              secureTextEntry
              icon="lock"
              name="password"
              placeholder="Nova senha"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
              }}
            />

            <Input
              ref={confirmPasswordRef}
              autoCapitalize="none"
              secureTextEntry
              icon="lock"
              name="password_confirmation"
              placeholder="Confirme sua senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Atualizar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
