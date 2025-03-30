import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useUser } from '../../contexts/user'; 

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useUser();


  const handleLogin = () => {
    const usuario = login(cpf, senha);
    if (usuario) {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Erro', 'CPF ou senha inválidos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu CPF e Senha</Text>


      <TextInput
        placeholder="Digite seu CPF"
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

      <Button title="Entrar" onPress={handleLogin} color="#2ecc71" />

      <Button
        title="Criar Conta"
        onPress={() => navigation.navigate('Sign')}
        color="#3498db"
      />
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
    fontSize: 20,
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

export default LoginScreen;
