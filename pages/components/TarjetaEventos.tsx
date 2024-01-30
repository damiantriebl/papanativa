import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { calculoColor } from '../../utils/calculoColor';
import { ProductoSchema } from '../../schemas/productoSchema';
import { EventoSchema } from '../../schemas/eventoSchema';

interface PButtonProps {
  title: string;
  onPress: () => void;
}

interface Item {
  tipo: 'bajar' | 'cobrar' | 'cero';
  producto: ProductoSchema;
  subtotal?: number;
  precioUnitario?: number;
  cantidad?: number;
  entrego?: number;
}

interface TarjetaEventosProps {
  index: number;
  item: EventoSchema;
  debeAFecha: number;
  handleEditar: (item: EventoSchema) => void;
}

const PButton: React.FC<PButtonProps> = ({ title, onPress }) => (
  <button onClick={onPress}>{title}</button>
);

const TarjetaEventos: React.FC<TarjetaEventosProps> = ({ item, index, debeAFecha, handleEditar }) => {
  let cardStyle: StyleProp<ViewStyle>;
  let titleText: string;
  let detailsText: string | undefined;

  switch (item.tipo) {
    case 'bajar':
      cardStyle = { borderLeftColor: calculoColor(item.producto) };
      titleText = item.producto ? item.producto.toString() : '';
      detailsText = `subtotal: $${item.subtotal} | $${item.precioUnitario} Precio Uni | ${item.cantidad} U`;
      break;
    case 'cobrar':
      cardStyle = { backgroundColor: 'tomato' };
      titleText = 'Se cobró';
      detailsText = `entregó: $${item.entrego}`;
      break;
    case 'cero':
      cardStyle = { backgroundColor: 'green' };
      titleText = 'Quedó en 0';
      break;
    default:
      return null;
  }


  return (
    <View key={index} style={{ ...cardStyle }}>
      <View style={{ ...styles.card, borderColor: calculoColor(item.producto) }}>
        <Text style={styles.title}>{titleText}</Text>
        {detailsText && (
          <>
            <View style={styles.details}>
              <Text>{detailsText}</Text>
            </View>
            <Text style={styles.dueDate}>a la fecha debía ${debeAFecha}</Text>
            <PButton title="editar" onPress={() => handleEditar(item)} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 15,
    shadowColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    color: 'grey',
  },
});

export default TarjetaEventos;
