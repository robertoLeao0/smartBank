import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import DashboardScreen from './screens/dashboard';
import UserProvider from '../contexts/user';
import Transfer from './screens/Transfer';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
      <UserProvider> 
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign" component={CreateAccountScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Transferir" component={Transfer} />
        </Stack.Navigator>
      </UserProvider>
  );
};

export default App;
