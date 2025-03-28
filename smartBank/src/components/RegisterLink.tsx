import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterLink = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Não tem conta? </Text>
      <TouchableOpacity onPress={() => console.log('Link de registro pressionado')}>
        <Text style={[styles.text, styles.link]}>Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: 'gray', // Cor cinza para todo o texto
  },
  link: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
});

export default RegisterLink;