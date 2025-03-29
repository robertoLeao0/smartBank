import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useUser } from '../../contexts/user';

const DashboardScreen: React.FC = () => {
  const { usuarioLogado, logout, updateChavePix } = useUser(); 
  const [novaChavePix, setNovaChavePix] = useState('');

  const handleLogout = () => {
    logout(); 
    alert('Você foi desconectado.');
  };

  const handleSaveChavePix = () => {
    if (novaChavePix === '') {
      Alert.alert('Erro', 'A chave Pix não pode ser vazia!');
      return;
    }

    
    updateChavePix(novaChavePix);
    Alert.alert('Sucesso', 'Chave Pix atualizada com sucesso!');
  };

  if (!usuarioLogado) {
    return (
      <View style={styles.container}>
        <Text>Você não está logado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {usuarioLogado.nome}</Text>
      <Text style={styles.detailsText}>CPF: {usuarioLogado.cpf}</Text>
      <Text style={styles.detailsText}>
        Chave Pix: {usuarioLogado.chavePix || 'Não cadastrada'}
      </Text>

  
      {usuarioLogado.chavePix === 'Não cadastrada' && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua Chave Pix"
            value={novaChavePix}
            onChangeText={setNovaChavePix}
            style={styles.input}
          />
          <Button title="Salvar Chave Pix" onPress={handleSaveChavePix} color="#2ecc71" />
        </View>
      )}

      <Text style={styles.balanceText}>Saldo: R${usuarioLogado.saldo}</Text>

      <View style={styles.cardDetails}>
        <Text style={styles.cardInfo}>Número do Cartão: {usuarioLogado.numeroCartao}</Text>
        <Text style={styles.cardInfo}>Data de Expiração: {usuarioLogado.dataExpiracaoCartao}</Text>
      </View>

      <Button title="Sair" onPress={handleLogout} color="#e74c3c" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginVertical: 15,
  },
  cardDetails: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
  },
  cardInfo: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  inputContainer: {
    marginVertical: 20,
    width: '100%',
    padding: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default DashboardScreen;
