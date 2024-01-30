import React from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';



interface RouteItem {
  key: string;
  title: string;
}
const AgregarClientes = ({ toggle }: { toggle: () => void }) => {
  const EventoSeleccionado = useSelector((state: any) => state.eventoSeleccionado);
  return (
    <View style={styles.container}>
        <Text>cosas a tirar </Text>
        <Text>cuchu cuchu cuchu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10
  },
  medioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    color: 'red', // Ajusta el color según tu tema
  },
  input: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: 'grey', // Ajusta el color según tu tema
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red', // Ajusta el color según tu tema
    marginBottom: 20,
  },
  buttonGrow: {
    flexGrow: 1,
  }
});

export default AgregarClientes;
