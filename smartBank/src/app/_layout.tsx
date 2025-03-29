import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import DashboardScreen from './screens/dashboard';
import UserProvider from '../contexts/user';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
      <UserProvider> 
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </UserProvider>
  );
};

export default App;
