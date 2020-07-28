import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Container, ButtonContainer, Title, Description } from './styles';
import Button from '../../components/Button';

interface RouteParams {
  provider: string;
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { provider, date } = route.params as RouteParams;

  const handleOk = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'Dashboard' }],
      index: 0
    });
  }, [navigation]);

  return (
    <Container>
      <Icon name="check" color="green" size={80} />
      <Title>Agendamento Concluído</Title>
      <Description>
        {format(date, "EEEE', dia 'dd' de 'MMMM' de 'yyyy' às 'HH':00h' ", {
          locale: ptBR
        })}
        {`com ${provider}`}
      </Description>
      <ButtonContainer>
        <Button onPress={handleOk}>Ok</Button>
      </ButtonContainer>
    </Container>
  );
};

export default AppointmentCreated;
