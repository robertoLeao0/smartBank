import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const WelcomeText = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.imgLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  imgLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
});

export default WelcomeText;