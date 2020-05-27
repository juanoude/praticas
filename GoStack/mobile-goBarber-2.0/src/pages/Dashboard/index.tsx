import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { logOut } = useAuth();

  return (
    <Container>
      <Button title="logout" onPress={logOut}>
        Sair
      </Button>
    </Container>
  );
};

export default Dashboard;
