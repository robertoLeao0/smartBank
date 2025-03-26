import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Tipagem para as props do DashboardButton
interface DashboardButtonProps {
  icon: keyof typeof FontAwesome.glyphMap;  // Isso garante que 'icon' seja um dos ícones válidos do FontAwesome
  title: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ icon, title }) => {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name={icon} size={30} color="#003366" />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#003366',
    fontWeight: 'bold',
  },
});

export default DashboardButton;
