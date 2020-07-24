import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Button from '../../components/Button';
import {
  Container,
  Header,
  Content,
  HeaderTitle,
  BackButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProvidersListContainer,
  CalendarButton,
  ButtonContainer,
  SchedulesSection,
  PeriodTitle,
  ScheduleList,
  Schedule,
  ScheduleText,
  SendButtonContainer
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

interface AvailabilityItem {
  hour: number;
  availability: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState(
    new Date().getHours() + 1
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability/`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

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
    (event: Event, selectedOnDatePicker: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker((state) => !state);
      }

      const currentDate = selectedOnDatePicker || selectedDate;
      setSelectedDate(currentDate);
    },
    [selectedDate]
  );

  const morningAvailability = useMemo(() => {
    if (availability) {
      const morningHours = availability
        .filter(({ hour }) => hour < 12)
        .map((item) => ({
          hour: item.hour,
          available: item.availability,
          formattedHour: format(new Date().setHours(item.hour), 'HH:00')
        }));

      return morningHours;
    }

    return [];
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    if (availability) {
      const afternoonHours = availability
        .filter(({ hour }) => hour >= 12)
        .map((item) => ({
          hour: item.hour,
          available: item.availability,
          formattedHour: format(new Date().setHours(item.hour), 'HH:00')
        }));

      return afternoonHours;
    }

    return [];
  }, [availability]);

  const handleSelectSchedule = useCallback((hour, available) => {
    if (available) {
      setSelectedSchedule(hour);
    }
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = selectedDate;
      date.setHours(selectedSchedule);
      date.setMinutes(0);

      const finalDate = format(date, 'yyyy-MM-dd HH:mm:ss');

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date: finalDate
      });

      navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (e) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao efetuar o agendamento, tente novamente'
      );
    }
  }, [selectedProvider, selectedDate, selectedSchedule]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
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

        <SchedulesSection>
          <PeriodTitle>Manhã</PeriodTitle>
          <ScheduleList horizontal>
            {morningAvailability.map(({ hour, available, formattedHour }) => (
              <Schedule
                key={hour}
                available={available}
                selected={selectedSchedule === hour}
                onPress={() => handleSelectSchedule(hour, available)}
              >
                <ScheduleText selected={selectedSchedule === hour && available}>
                  {formattedHour}
                </ScheduleText>
              </Schedule>
            ))}
          </ScheduleList>
        </SchedulesSection>

        <SchedulesSection>
          <PeriodTitle>Tarde</PeriodTitle>
          <ScheduleList horizontal>
            {afternoonAvailability.map(({ hour, available, formattedHour }) => (
              <Schedule
                key={hour}
                available={available}
                selected={selectedSchedule === hour}
                onPress={() => handleSelectSchedule(hour, available)}
              >
                <ScheduleText selected={selectedSchedule === hour && available}>
                  {formattedHour}
                </ScheduleText>
              </Schedule>
            ))}
          </ScheduleList>
          <SendButtonContainer>
            <Button onPress={handleCreateAppointment}>Agendar Horário</Button>
          </SendButtonContainer>
        </SchedulesSection>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
