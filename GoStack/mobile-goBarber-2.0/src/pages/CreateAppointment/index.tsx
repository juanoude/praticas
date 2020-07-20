import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from '@react-native-community/datetimepicker';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProvidersListContainer,
  CalendarButton,
  ButtonContainer
} from './styles';
import { useAuth } from '../../hooks/AuthContext';

import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleShow = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleChangeDate = useCallback(
    (event: any, selectedOnDatePicker: Date) => {
      if (Platform.OS === 'android') {
        handleToggleShow();
        // setShowDatePicker((state) => !state);
      }

      const currentDate = selectedOnDatePicker || selectedDate;
      setSelectedDate(currentDate);
    },
    [selectedDate]
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          data={providers}
          showsHorizontalScrollIndicator={false}
          horizontal
          // initialScrollIndex={{}}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(item.id)}
              selected={selectedProvider === item.id}
            >
              <ProviderAvatar source={{ uri: item.avatar_url }} />
              <ProviderName selected={selectedProvider === item.id}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <ButtonContainer>
        <CalendarButton onPress={handleToggleShow}>
          <Icon name="calendar" size={28} />
        </CalendarButton>
      </ButtonContainer>
      {showDatePicker && (
        <DatePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleChangeDate}
        />
      )}
    </Container>
  );
};

export default CreateAppointment;
