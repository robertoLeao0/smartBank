import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

  const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

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
      navigation.navigate('ConfirmPay', {
        chavePix,
        valorTransferencia,
      });
    } else {
      Alert.alert('Erro', 'Digite um CPF ou e-mail válido.');
    }
  };

  const handTransfer = () => {
    navigation.navigate('Transferir');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Para quem você quer transferir {valorTransferencia}?</Text>
      <Text style={styles.textochave}>Digite a chave PIX abaixo:</Text>
      <TextInput
        style={styles.input}
        value={chavePix}
        onChangeText={setChavePix}
        keyboardType="default"
        placeholder="CPF ou E-mail"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar </Text>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCancel} onPress={handTransfer}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginBottom: 8,
  },
  textochave: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    width: '80%',
    paddingVertical: 8,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Key;
