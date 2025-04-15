import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../contexts/user';

const HistoricoTransacoes = () => {
  const { usuarioLogado } = useUser();

  if (!usuarioLogado) {
    return (
      <View style={styles.container}>
        <Text>Você não está logado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerText}>Histórico de transações</Text>
      </View>

      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo disponível</Text>
        <Text style={styles.saldoValor}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(usuarioLogado.saldo)}
                </Text>
      </View>

      <View style={styles.dataSection}>
        <View style={styles.dateHeader}>
          <Ionicons name="calendar" size={18} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.dateHeaderText}>Hoje.</Text>
        </View>

        <View style={styles.pixItem}>
          <Text style={styles.pixTipoRecebido}>● Pix recebido</Text>
          <Text style={styles.pixValorRecebido}>R$ 300,00</Text>
          <Text style={styles.pixDescricao}>Freitas e Soares representações</Text>
        </View>

        <View style={styles.pixItem}>
          <Text style={styles.pixTipoEnviado}>● Pix enviado</Text>
          <Text style={styles.pixValorEnviado}>-R$ 89,90</Text>
          <Text style={styles.pixDescricao}>Chocolates Show BR</Text>
        </View>

        <View style={styles.pixItem}>
          <Text style={styles.pixTipoRecebido}>● Pix recebido</Text>
          <Text style={styles.pixValorRecebido}>R$ 59,90</Text>
          <Text style={styles.pixDescricao}>ferragens & cia LTDA</Text>
        </View>
      </View>

      <View style={styles.dataSection}>
        <View style={styles.dateHeader}>
          <Ionicons name="calendar" size={18} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.dateHeaderText}>segunda, 24 de março</Text>
        </View>
        {/* Sem transações visíveis aqui */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#005EA6',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
  },
  saldoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saldoLabel: {
    fontSize: 16,
    color: '#555',
  },
  saldoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  dataSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 4,
    marginBottom: 12,
  },
  dateHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pixItem: {
    marginBottom: 16,
  },
  pixTipoRecebido: {
    color: '#005EA6',
    fontWeight: 'bold',
  },
  pixTipoEnviado: {
    color: '#C10000',
    fontWeight: 'bold',
  },
  pixValorRecebido: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  pixValorEnviado: {
    fontSize: 16,
    color: '#C10000',
    marginTop: 4,
  },
  pixDescricao: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});

export default HistoricoTransacoes;
