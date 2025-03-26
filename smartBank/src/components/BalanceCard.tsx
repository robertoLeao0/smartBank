import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Seu saldo</Text>
      <Text style={styles.balance}>R$1.000,00</Text>
      <Text style={styles.details}>Número da Conta: 4864246-1</Text>
      <Text style={styles.details}>Data de Expiração: 12/30</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#003366',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  balance: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    color: '#fff',
    fontSize: 14,
  },
});
