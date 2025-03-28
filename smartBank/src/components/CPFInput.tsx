import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const CPFInput = ({ onChangeText }) => {
  const [value, setValue] = useState('');

  const handleTextChange = (text) => {
    // Limita o comprimento a 14 caracteres
    if (text.length <= 14) {
      setValue(text);
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="134.682.950-11"
        value={value}
        onChangeText={handleTextChange}
        maxLength={14}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default CPFInput;