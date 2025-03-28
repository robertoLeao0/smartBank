import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo ao SmartBank!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20, // Exemplo de espaçamento à esquerda
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WelcomeText;