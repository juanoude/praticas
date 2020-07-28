import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/AuthContext';
import {
  Container,
  Header,
  HeaderText,
  HeaderName,
  ProfileButton,
  Avatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderMeta,
  ProviderName,
  MetaAvailability,
  ProviderInfo
} from './styles';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState([]);

  const { user, logOut } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation]
  );

  return (
    <Container>
      <Header>
        <HeaderText>
          Bem-vindo,
          {'\n'}
          <HeaderName>{user.name}</HeaderName>
        </HeaderText>
        <ProfileButton onPress={navigateToProfile}>
          <Avatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(item.id)}
          >
            <ProviderAvatar source={{ uri: item.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <MetaAvailability> Segunda a Sexta</MetaAvailability>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <MetaAvailability> 8h às 18h </MetaAvailability>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
