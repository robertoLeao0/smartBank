import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({ placeholder, onChangeText }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Senha'}
        secureTextEntry={!passwordVisible}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <Ionicons
          name={passwordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray', // Adicione borda ao container
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
});

export default PasswordInput;