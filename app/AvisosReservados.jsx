import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';

export default function AvisosReservados() {
  return (
    <View style={styles.avisosReservadoBox}>
      <Text style={styles.avisosReservadoTitulo}>Área reservada para anúncios</Text>
    </View>
  );
}
