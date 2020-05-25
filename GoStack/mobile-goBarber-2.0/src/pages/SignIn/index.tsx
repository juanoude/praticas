import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          // contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <Title> Faça seu logon </Title>

            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                icon="mail"
                name="email"
                placeholder="Digite o E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputRef.current?.focus();
                }}
              />
              <Input
                ref={inputRef}
                autoCapitalize="none"
                secureTextEntry
                textContentType="password"
                icon="lock"
                name="password"
                placeholder="Digite sua senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Cadastrar uma nova conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
