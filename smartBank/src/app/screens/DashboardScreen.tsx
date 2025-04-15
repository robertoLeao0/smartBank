import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../../contexts/user';

const DashboardScreen: React.FC = ({ navigation }: any) => {
  const { usuarioLogado } = useUser();

  const handleTransfer = () => navigation.navigate('Transferir');
  const handlePayBoleto = () => alert('Função em construção!');
  const handleHistorico = () => navigation.navigate('Historico');
  const handleInvestimentos = () => alert('Função em construção!');

  if (!usuarioLogado) {
    return (
      <View style={styles.container}>
        <Text>Você não está logado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Icon name="menu" size={28} color="#003366" />
      </View>

      <Text style={styles.welcome}>Olá, {usuarioLogado.nome} </Text>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Seu saldo</Text>
          <Icon name="eye" size={20} color="#fff" />
        </View>

{/* teste de saldo corrigido */}
        <Text style={styles.balanceValue}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(usuarioLogado.saldo)}
        </Text>

        <View style={styles.cardInfo}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Número da Conta</Text>
            <Text style={styles.infoValue}>{usuarioLogado.numeroCartao}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Validade</Text>
            <Text style={styles.infoValue}>{usuarioLogado.dataExpiracaoCartao}</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={handleTransfer}>
          <Icon name="barcode" size={36} color="#003366" />
          <Text style={styles.cardTitle}>Transferir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handlePayBoleto}>
          <Icon name="file-document-outline" size={36} color="#003366" />
          <Text style={styles.cardTitle}>Pagar Boleto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleHistorico}>
          <Icon name="clock-outline" size={36} color="#003366" />
          <Text style={styles.cardTitle}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleInvestimentos}>
          <Icon name="chart-bar" size={36} color="#003366" />
          <Text style={styles.cardTitle}>Investimentos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 140,
    height: 40,
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#003366',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    color: '#fff',
    fontSize: 12,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#f5f6fa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#003366',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen;
