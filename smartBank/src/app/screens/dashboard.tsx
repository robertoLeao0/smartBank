import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DashboardButton from '../../components/DashboardButton';
import BalanceCard from '../../components/BalanceCard';

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BalanceCard />
      <View style={styles.buttonsContainer}>
        <DashboardButton icon="barcode" title="Transferir" />
        <DashboardButton icon="layers" title="Pagar Boleto" />
        <DashboardButton icon="clock" title="Histórico de Transação" />
        <DashboardButton icon="bar-chart" title="Investimentos" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default DashboardScreen;
