import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'; 
import { useUser } from '../../contexts/user';

const CreateAccountScreen: React.FC = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const { criarConta } = useUser();

  // Função para verificar a autenticação biométrica
  const handleFaceIDAuthentication = async () => {
    try {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
      if (isBiometricSupported) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Autentique-se para criar sua conta!',
          fallbackLabel: 'Usar senha',
        });

        if (result.success) {
          Alert.alert('Autenticação biométrica', 'Você autenticou com sucesso!');
        } else {
          Alert.alert('Erro', 'Falha na autenticação biométrica.');
        }
      } else {
        Alert.alert('Erro', 'Seu dispositivo não suporta autenticação biométrica.');
      }
    } catch (error) {
      console.error('Erro ao tentar autenticar com a biometria:', error);
      Alert.alert('Erro', 'Houve um erro ao tentar autenticar com a biometria.');
    }
  };

  const handleCreateAccount = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    const contaCriada = criarConta(nome, cpf, senha);
    if (contaCriada) {
      Alert.alert('Conta criada com sucesso', 'Agora você pode fazer login!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', 'Já existe uma conta com esse CPF.');
    }
  };

  useEffect(() => {
    // Tenta autenticar com a biometria assim que a tela é carregada
    handleFaceIDAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criação de Conta</Text>

      <TextInput
        placeholder="Digite seu Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite seu CPF (Ex: 111.222.333-44)"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Digite sua Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Criar Conta" onPress={handleCreateAccount} color="#2ecc71" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default CreateAccountScreen;
