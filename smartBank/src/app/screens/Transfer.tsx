import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Transfer: React.FC = () => {
  const [valor, setValor] = useState<string>('R$ 0,00');

  const formatarMoeda = (inputValue: string): string => {
    let valorNumerico = inputValue.replace(/\D/g, '');
    if (valorNumerico.length === 0) return 'R$ 0,00';
    let numero = (parseInt(valorNumerico, 10) / 100).toFixed(2);
    return `R$ ${numero.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const handleChange = (text: string): void => {
    setValor(formatarMoeda(text));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual é o valor da transferência?</Text>
      <Text style={styles.saldo}>Seu saldo disponível: R$ 1.500,00</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Transferência iniciada')}>
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
  saldo: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    width: '50%',
    marginBottom: 30,
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

export default Transfer;
