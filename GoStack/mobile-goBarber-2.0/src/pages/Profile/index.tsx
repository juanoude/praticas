import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  PermissionsAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
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

  const { user, updateUser } = useAuth();

  const handleSignUp = useCallback(async (data) => {
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

      const { name, email, old_password, password } = data;

      const sendData = {
        name,
        email,
        ...(old_password
          ? {
              old_password,
              password
            }
          : {})
      };
      console.log(sendData);

      const response = await api.put('/profile/update', sendData);

      await updateUser(response.data);

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert('Erro na atualização', 'tente novamente');
    }
  }, []);

  const handleAvatar = useCallback(async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permissão',
        message: 'Permita que nosso app acesse a camera',
        buttonNeutral: 'Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Permitir'
      }
    );

    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permissão',
        message: 'Permita que nosso app acesse a camera',
        buttonNeutral: 'Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Permitir'
      }
    );

    if (
      granted === PermissionsAndroid.RESULTS.GRANTED &&
      granted2 === PermissionsAndroid.RESULTS.GRANTED
    ) {
      ImagePicker.showImagePicker({}, (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          console.log(response.error);
          Alert.alert('Erro ao abrir foto', 'Tente novamente');
        }

        const formData = new FormData();

        formData.append('avatar', {
          type: response.type,
          name: response.fileName,
          uri: response.uri
        });

        console.log(formData);

        api.patch('/users/avatar', formData).then(
          (patchResponse) => {
            updateUser(patchResponse.data);
          },
          (error) => console.log(error)
        );
      });
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
            <AvatarButton onPress={handleAvatar}>
              <Icon name="camera" size={25} />
            </AvatarButton>
          </AvatarContainer>

          <Title> Perfil </Title>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              defaultValue={user.name}
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
              defaultValue={user.email}
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
