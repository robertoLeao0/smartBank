import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransferenciaConcluida'>;

const TransferenciaScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [mensagem, setMensagem] = useState<string>('');

  const handleConfirmacao = () => {
    navigation.navigate('TransferenciaConcluida');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.titulo}>Transferindo</Text>
      <Text style={styles.valor}>R$ 100,00</Text>
      <Text style={styles.destinatario}>para Mariana Naira Figueiredo</Text>

      <View style={styles.mensagemContainer}>
        <Ionicons name="chatbubble-outline" size={16} color="#003366" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#999"
          style={styles.inputMensagem}
          value={mensagem}
          onChangeText={setMensagem}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>CPF</Text>
        <Text style={styles.infoValue}>*.222.543-*</Text>

        <Text style={styles.infoLabel}>Instituição</Text>
        <Text style={styles.infoValue}>BANCO INTER LTDA</Text>

        <Text style={styles.infoLabel}>Agência</Text>
        <Text style={styles.infoValue}>556</Text>

        <Text style={styles.infoLabel}>Conta corrente</Text>
        <Text style={styles.infoValue}>45560-9</Text>
      </View>

      <View style={styles.linhaSeparadora} />

      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmacao}>
        <Text style={styles.textoBotao}>CONFIRMAR TRANSFERÊNCIA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  valor: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  destinatario: {
    fontSize: 13,
    color: '#333',
    marginBottom: 24,
  },
  mensagemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 24,
  },
  inputMensagem: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoLabel: {
    color: '#444',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#000',
    marginBottom: 12,
  },
  linhaSeparadora: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  botaoConfirmar: {
    backgroundColor: '#003366', // Azul escuro
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});

export default TransferenciaScreen;