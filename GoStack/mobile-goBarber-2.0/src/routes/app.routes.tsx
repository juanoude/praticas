import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator headerMode="none">
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
