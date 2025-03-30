import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Alert, StyleSheet } from 'react-native';
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
      <Image source={require('../../assets/logo.png')} style={styles.imgLogo} />
      
      <Text style={styles.title}>Bem-vindo ao SmartBank!</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar na minha conta</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>Não tem conta?
      <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
         <Text style={[styles.registerText, styles.registerLink]}>Registre-se</Text>
      </TouchableOpacity>
      </Text>

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
    fontSize: 40,
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
  loginButton: {
    backgroundColor: '#004080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    color: 'gray',
    fontSize: 16,
  },
  registerLink: {
    textDecorationLine: 'underline'
  },
  imgLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
});

export default LoginScreen;
