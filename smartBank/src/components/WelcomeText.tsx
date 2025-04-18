import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SmartBank!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 40,
    color: '#2c3e50',
    marginBottom: 20,
  },
});

export default WelcomeText;