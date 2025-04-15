import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native';
import { useUser } from '../../contexts/user';

const CreateAccountScreen: React.FC = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const { criarConta } = useUser();

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        
        <Image
            source={require("../../assets/logo.png")}
            style={styles.imgLogo}
        />

        <Text style={styles.title}>Criação de Conta</Text>

        <TextInput
          placeholder="Digite seu Nome Completo"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#8e8e93"
        />

        <TextInput
          placeholder="Digite seu CPF (Ex: 111.222.333-44)"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#8e8e93"
        />

        <TextInput
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#8e8e93"
        />

        <TextInput
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#8e8e93"
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgLogo: {
    width: 200,
    height: 200,
    marginTop: -200,
    resizeMode: "contain",
  },
});

export default CreateAccountScreen;
