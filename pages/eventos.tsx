import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Modal, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventosPorCliente } from '../store/eventoSlice'; // Importa la acción correcta
import { RootState } from '../store/store';
import AgregarEventos from './components/AgregarEventos';
import { EventoSchema } from '../schemas/eventoSchema';
import { calculoColor } from '../utils/calculoColor';
import GestureRecognizer from 'react-native-swipe-gestures';
import PButton from './components/PButton';
import { SeleccionarEvento } from '../store/EventoSeleccionadoSlice';
import { agregar0 } from '../store/eventoSlice';
import TarjetaEventos from './components/tarjetaEventos';

export default function Eventos() {
  const [isFormVisible, setFormVisible] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const { clienteId } = route.params;
  const { eventosPorCliente, loading, error } = useSelector((state: RootState) => state.eventos);
  const clientes = useSelector((state: RootState) => state.clientes.data);
  const clienteSeleccionado = clientes.find((cli) => cli.id == clienteId);
  const eventosAnteriores = useRef(eventosPorCliente[clienteId]);

  let debeAFecha = clienteSeleccionado!.debe;
  const listaEventos = eventosPorCliente[clienteId];
  console.log('la lista de eventos', listaEventos);
  useEffect(() => {
    dispatch(fetchEventosPorCliente({ idCliente: clienteId, forzarLlamada: false }));
  }, [dispatch, clienteId]);

  useEffect(() => {
    let suma = 0;

    if (loading === false && listaEventos) {
      for (let i = eventosPorCliente[clienteId].length - 1; i >= 0; i--) {
        suma = eventosPorCliente[clienteId][i].entrego ? suma - eventosPorCliente[clienteId][i].entrego : suma + eventosPorCliente[clienteId][i].subtotal;

        if (suma <= 0) {
          dispatch(agregar0({ tipo: 'cero', index: i, clienteId }));
        }
      }
    }

    eventosAnteriores.current = eventosPorCliente[clienteId];
  }, [loading]);
  const toggleForm = () => {
    console.log('se cierraaaa')
    setFormVisible(!isFormVisible);
  };
  const handleEditar = (evento: EventoSchema) => {
    dispatch(SeleccionarEvento(evento));
    setFormVisible(!isFormVisible);

  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
  if (loading) return (<Text>cargando...</Text>);
  if (error) return (<Text>Error: {error}</Text>);
  if (listaEventos) {
    return (

      <View style={styles.container}>
        <Text>hoy debe {clienteSeleccionado?.debe} </Text>
        <View>
          {eventosPorCliente[clienteId].map((item: EventoSchema, index) => {
            if (item.tipo !== 'cero') {
              debeAFecha = item.tipo !== 'cobrar' ? debeAFecha - (+item.subtotal) : debeAFecha + item.entrego
            }
            return (
              <TarjetaEventos item={item} key={index} index={index} debeAFecha={debeAFecha} handleEditar={handleEditar} />
            )
          }
          )}
        </View>
        <Button title="Mostrar Formulario" onPress={toggleForm} />
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
                <AgregarEventos toggle={toggleForm} />
              </View>
            </Modal>
          </GestureRecognizer>

        )}
      </View>
    );
  }
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
    backgroundColor: '#f0f0f0',
  },


  // Add more styles as needed
});

