import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUser } from "../../contexts/user";
import * as LocalAuthentication from "expo-local-authentication"; // Importando o LocalAuthentication

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useUser();

  // Função para autenticar usando o Face ID ou outro método biométrico
  const handleFaceIDLogin = async () => {
    try {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Autentique-se com sua biometria",
          fallbackLabel: "Usar senha",
        });

        if (result.success) {
          Alert.alert("Sucesso", "Autenticação bem-sucedida!");
          navigation.navigate("Dashboard");
        } else {
          Alert.alert("Erro", "Falha na autenticação biométrica.");
        }
      } else {
        Alert.alert("Erro", "Seu dispositivo não tem biometria cadastrada.");
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao tentar autenticar com biometria.");
    }
  };

  const handleLogin = () => {
    const usuario = login(cpf, senha);
    if (usuario) {
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Erro", "CPF ou senha inválidos!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.imgLogo}
        />

        <Text style={styles.title}>Bem-vindo ao SmartBank!</Text>

        <TextInput
          placeholder="Digite seu CPF"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar na minha conta</Text>
        </TouchableOpacity>

        {/* Botão para autenticação biométrica */}
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleFaceIDLogin}
        >
          <Text style={styles.biometricButtonText}>Entrar com Face ID</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign")}>
            <Text style={styles.registerLink}> Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 40,
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000"
  },
  loginButton: {
    backgroundColor: "#004080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  biometricButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  biometricButtonText: {
    color: "white",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
  },
  registerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
  registerLink: {
    textDecorationLine: "underline",
  },
  imgLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default LoginScreen;
