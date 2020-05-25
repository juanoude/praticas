import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import { Container, Title, CreateAccount, CreateAccountText } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback((data) => {
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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCapitalize="words"
                icon="user"
                name="nome"
                placeholder="Digite seu nome"
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
                placeholder="Digite o E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordRef}
                autoCapitalize="none"
                secureTextEntry
                icon="lock"
                name="password"
                placeholder="Digite sua senha"
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
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <CreateAccountText>Voltar para o logon</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignUp;
