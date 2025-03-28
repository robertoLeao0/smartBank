import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginButton from '../../components/LoginButton';
import PasswordInput from '../../components/PasswordInput';
import CPFInput from '../../components/CPFInput';
import RegisterLink from '../../components/RegisterLink';
import WelcomeText from '../../components/WelcomeText';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        {/* <CPFInput /> ta dando bug*/}
        <WelcomeText />
        <PasswordInput />
        <LoginButton />
        <RegisterLink />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;