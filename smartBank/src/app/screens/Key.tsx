import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Pay: React.FC = () => {
  const [chavePix, setChavePix] = useState<string>('');

  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Impede CPFs como 111.111.111-11

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf[10]);
  };

  const validarEmail = (email: string): boolean => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleContinue = () => {
    if (validarCPF(chavePix) || validarEmail(chavePix)) {
      console.log('Chave válida! Prosseguindo...');
      // Aqui você pode navegar para a próxima tela
    } else {
      Alert.alert('Erro', 'Digite um CPF ou e-mail válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Para quem você quer transferir R$ 100,00?</Text>
      <Text style={styles.textochave}>Digite a chave PIX abaixo:</Text>
      <TextInput
        style={styles.input}
        value={chavePix}
        onChangeText={setChavePix}
        keyboardType="default"
        placeholder="CPF, e-mail ou chave aleatória"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  textochave: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    width: '80%',
    marginBottom: 30,
    padding: 10,
  },
  button: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Pay;
