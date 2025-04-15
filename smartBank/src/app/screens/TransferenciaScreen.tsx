import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

// Tipagem dos parâmetros esperados
type Params = {
  TransferenciaScreen: {
    chavePix: string;
    valorTransferencia: string;
  };
};

type Navigation = {
  navigate: (screen: string) => void;
};

const TransferenciaScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<Params, 'TransferenciaScreen'>>();

  const { chavePix, valorTransferencia } = route.params;

  const handleConfirmacao = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>Transferindo</Text>
      <Text style={styles.valor}>R$ {valorTransferencia}</Text>
      <Text style={styles.destinatario}>para a chave PIX:</Text>
      <Text style={styles.chave}>{chavePix}</Text>

      <View style={styles.mensagemContainer}>
        <Ionicons name="chatbubble-outline" size={16} color="#555" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#999"
          style={styles.inputMensagem}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Chave PIX</Text>
        <Text style={styles.infoValue}>{chavePix}</Text>

        <Text style={styles.infoLabel}>Instituição</Text>
        <Text style={styles.infoValue}>BANCO INTER LTDA</Text>

        <Text style={styles.infoLabel}>Agência</Text>
        <Text style={styles.infoValue}>556</Text>

        <Text style={styles.infoLabel}>Conta corrente</Text>
        <Text style={styles.infoValue}>45560-9</Text>
      </View>

      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmacao}>
        <Text style={styles.textoBotao}>CONFIRMAR TRANFERÊNCIA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  destinatario: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
  },
  chave: {
    fontSize: 16,
    color: '#000',
    marginBottom: 24,
  },
  mensagemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
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
    borderTopWidth: 1,
    borderColor: '#999',
    paddingTop: 16,
    marginBottom: 32,
  },
  infoLabel: {
    color: '#444',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  botaoConfirmar: {
    backgroundColor: '#005EA6',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TransferenciaScreen;
