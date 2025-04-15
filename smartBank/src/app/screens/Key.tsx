import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type Params = {
  Key: {
    valorTransferencia: string;
  };
};

const Key = ({ navigation }: any) => {
  const route = useRoute<RouteProp<Params, 'Key'>>();
  const { valorTransferencia } = route.params;

  const [chavePix, setChavePix] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    let resto = (soma * 10) % 11;
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
    const chaveLimpa = chavePix.replace(/\D/g, '');
    const isEmail = validarEmail(chavePix);
    const isCPF = validarCPF(chaveLimpa);

    if (isEmail || isCPF) {
      navigation.navigate('ConfirmPay', {
        chavePix: isEmail ? chavePix : chaveLimpa,
        valorTransferencia,
      });
    } else {
      setErrorMessage('Por favor, insira um CPF ou e-mail válido.');
    }
  };

  const handleCancel = () => {
    navigation.navigate('Transferir');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Para quem você quer transferir {valorTransferencia}?</Text>
        <Text style={styles.label}>Digite a chave PIX:</Text>
        <TextInput
          style={styles.input}
          value={chavePix}
          onChangeText={setChavePix}
          keyboardType="default"
          placeholder="CPF ou E-mail"
          placeholderTextColor="#999"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 30,
  },
  input: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingVertical: 6,
    color: '#000000',
    width: '70%',
    textAlign: 'left',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Key;
