import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const Transfer: React.FC = () => {
  // Especificando que 'valor' será do tipo string
  const [valor, setValor] = useState<string>('R$ 0,00');

  // Função para formatar o valor em moeda
  const formatarMoeda = (inputValue: string): string => {
    let valorNumerico = inputValue.replace(/\D/g, ""); // Remove tudo que não for número

    if (valorNumerico.length === 0) return "R$ 0,00"; // Se estiver vazio, volta para "R$ 0,00"

    let numero = (parseInt(valorNumerico, 10) / 100).toFixed(2); // Divide por 100 para os centavos
    return `R$ ${numero.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`; // Formata como moeda brasileira
  };

  // Função chamada ao digitar no campo
  const handleChange = (text: string): void => {
    setValor(formatarMoeda(text)); // Atualiza o estado com o valor formatado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Qual é o valor da transferência</Text>
      <Text style={styles.saldo}>Seu saldo: {valor}.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={valor} // Mantém "R$" no valor digitado
          onChangeText={handleChange} // Atualiza o estado corretamente
          keyboardType="numeric"
        />
      </View>
      <Button style={styles.botao} title="Continuar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  texto: {
    marginTop: 40,
    fontSize: 32,
    width: 300,
    height: 81,
  },
  saldo: {
    fontSize: 20,
  },
  inputContainer: {
    borderBottomWidth: 2, // Underline
    borderBottomColor: "black",
    width: 200, // Largura do input com o underline
    marginBottom: 580,
  },
  input: {
    fontSize: 32,
  },
});

export default Transfer;

