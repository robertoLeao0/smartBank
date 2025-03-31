import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import Dashboard from './screens/DashboardScreen';
import UserProvider from '../contexts/user';
import Transfer from './screens/Transfer';
import Key from './screens/Key'
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
      <UserProvider> 
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="Sign" component={CreateAccountScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Transferir" component={Transfer} />
          <Stack.Screen name="Key" component={Key} />
        </Stack.Navigator>
      </UserProvider>
  );
};

export default App;
