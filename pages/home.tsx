import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../schemas/navigationProps';
import { fetchClientes } from '../store/clientesSlice';
import { seleccionarCliente } from '../store/clienteSeleccionadoSlice';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import TarjetaCliente from './components/TarjetaClientes';
import GestureRecognizer from 'react-native-swipe-gestures';
import AgregarClientes from './components/AgregarClientes';

export default function Home() {
  const [isFormVisible, setFormVisible] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.clientes);

  useEffect(() => {
    dispatch(fetchClientes());
  }, []);
  const toggleForm = () => {
    console.log('se cierraaaa')
    setFormVisible(!isFormVisible);
  };
  const handlePress = (id: string) => {
    const findClient = data.find(cliente => cliente.id === id);
    dispatch(seleccionarCliente(findClient));
    navigation.navigate('Eventos', { clienteId: id });
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
  return (
    <View style={styles.container}>
      {loading && <Text>Cargando ....</Text>}
      {error && <Text>bueno alguna cosa hiciste gato</Text>}
      {data && data.map(cliente => {
        return (
          <TarjetaCliente cliente={cliente} index={cliente.id} key={cliente.id} />
        )
      })}
       {isFormVisible && (
          <GestureRecognizer
            onSwipeDown={toggleForm}
            config={config}
          >
            <Modal
              swipeDirection="down"
              onSwipeComplete={toggleForm}
              animationType="slide"
              transparent={true}
              visible={isFormVisible}
              onRequestClose={toggleForm}
            >
              <View style={styles.modalContainer}>
                <AgregarClientes toggle={toggleForm} />
              </View>
            </Modal>
          </GestureRecognizer>

        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%', // Toma el 70% de la pantalla desde la parte inferior
    backgroundColor: 'white',
    // Estilos de sombra más pronunciados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10, // Mayor elevación en Android

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
});
