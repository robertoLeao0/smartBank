import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../../contexts/user';

const Transfer: React.FC = ({ navigation }: any) => {
  const { usuarioLogado } = useUser();
  const [valor, setValor] = useState<string>('R$ 0,00');
  const [erro, setErro] = useState<string>('');

  const formatarMoeda = (inputValue: string): string => {
    let valorNumerico = inputValue.replace(/\D/g, '');
    if (valorNumerico.length === 0) return 'R$ 0,00';
    let numero = (parseInt(valorNumerico, 10) / 100).toFixed(2);
    return `R$ ${numero.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const handleChange = (text: string): void => {
    setValor(formatarMoeda(text));
    setErro('');
  };

  const validarValor = (valor: string): boolean => {
    let valorNumerico = valor.replace(/\D/g, '');
    const valorConvertido = parseInt(valorNumerico, 10) / 100;
    return valorConvertido >= 0.01;
  };

  const handKey = () => {
    const valorNumerico = parseInt(valor.replace(/\D/g, ''), 10) / 100;
    const saldoAtual = usuarioLogado?.saldo ?? 0;

    if (saldoAtual <= 0) {
      Alert.alert('Saldo insuficiente', 'Você não possui saldo para realizar transferências.');
      setErro('Saldo insuficiente.');
      return;
    }

    if (valorNumerico > saldoAtual) {
      Alert.alert('Saldo insuficiente', 'O valor excede o seu saldo disponível.');
      setErro('O valor excede o seu saldo disponível.');
      return;
    }

    if (validarValor(valor)) {
      navigation.navigate('Key', { valorTransferencia: valor });
    } else {
      setErro('Valor inválido.');
    }
  };

  const Dashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Qual é o valor da transferência?</Text>
        <Text style={styles.saldo}>Seu saldo disponível: R$ {usuarioLogado?.saldo}.</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={handleChange}
          keyboardType="numeric"
        />
        {erro ? <Text style={styles.erroText}>{erro}</Text> : null}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handKey}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Dashboard}>
          <Text style={styles.buttonText}>Voltar</Text>
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
    justifyContent: 'space-between', // distribui o conteúdo e joga os botões pro final
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  saldo: {
    fontSize: 14,
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
  erroText: {
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

export default Transfer;
