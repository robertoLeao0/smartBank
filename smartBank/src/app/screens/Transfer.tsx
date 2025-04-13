import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../../contexts/user';

const Transfer: React.FC = ({ navigation }: any) => {
  const { usuarioLogado } = useUser();
  const [valor, setValor] = useState<string>('R$ 0,00');
  const [erro, setErro] = useState<string>(''); // Estado para armazenar a mensagem de erro

  // Função para formatar a moeda
  const formatarMoeda = (inputValue: string): string => {
    let valorNumerico = inputValue.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    if (valorNumerico.length === 0) return 'R$ 0,00';
    let numero = (parseInt(valorNumerico, 10) / 100).toFixed(2); // Converte para valor monetário
    return `R$ ${numero.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`; // Formata a moeda
  };

  // Função para lidar com a alteração do valor
  const handleChange = (text: string): void => {
    setValor(formatarMoeda(text));
    setErro(''); // Limpar mensagem de erro ao alterar o valor
  };

  // Função para verificar se o valor é válido (igual ou maior que 0,01)
  const validarValor = (valor: string): boolean => {
    let valorNumerico = valor.replace(/\D/g, ''); // Remove caracteres não numéricos
    const valorConvertido = parseInt(valorNumerico, 10) / 100; // Converte para valor numérico
    return valorConvertido >= 0.01; // Verifica se é maior ou igual a 0,01
  };

  // Função que lida com a navegação para a tela de chave (Key)
  const handKey = () => {
    const valorNumerico = parseInt(valor.replace(/\D/g, ''), 10) / 100;
    const saldoAtual = usuarioLogado?.saldo ?? 0;

    // Se o saldo do usuário for 0
    if (saldoAtual <= 0) {
      Alert.alert('Saldo insuficiente', 'Você não possui saldo para realizar transferências.');
      setErro('Saldo insuficiente.'); 
      return;
    }

    // Se o valor digitado for maior que o saldo
    if (valorNumerico > saldoAtual) {
      Alert.alert('Saldo insuficiente', 'O valor excede o seu saldo disponível.');
      setErro('O valor excede o seu saldo disponível.'); 
      return;
    }

    // Se o valor for válido, continua para a tela de chave (Key)
    if (validarValor(valor)) {
      navigation.navigate('Key', { valorTransferencia: valor });
    } else {
      setErro('Valor inválido.'); // Exibe a mensagem de erro
    }
  };

  // Função para voltar para a tela Dashboard
  const Dashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual é o valor da transferência?</Text>
      <Text style={styles.saldo}>Seu saldo disponível: R$ {usuarioLogado?.saldo ?? '0,00'}.</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
      {erro ? <Text style={styles.erroText}>{erro}</Text> : null} {/* Exibe a mensagem de erro se houver */}
      <TouchableOpacity style={styles.button} onPress={handKey}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={Dashboard}>
        <Text style={styles.buttonText}>Voltar</Text>
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
    marginBottom: 10,
  },
  erroText: {
    color: 'red', // Cor vermelha para a mensagem de erro
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Transfer;

