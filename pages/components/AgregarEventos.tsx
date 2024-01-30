import React, { useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, Route } from 'react-native-tab-view';
import { BajarProducto } from './BajarProductos';
import { Cobrar } from './Cobrar';
import { useSelector } from 'react-redux';



interface RouteItem {
  key: string;
  title: string;
}
const AgregarEventos = ({ toggle }: { toggle: () => void }) => {
  const layout = useWindowDimensions();
  const EventoSeleccionado = useSelector((state: any) => state.eventoSeleccionado);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<RouteItem[]>([
    { key: 'first', title: 'Bajar Producto' },
    { key: 'second', title: 'Cobrar' },
  ]);
  useEffect(() => {
    if (EventoSeleccionado.tipo === 'cobrar') {
      setIndex(1)
    }
  }, [EventoSeleccionado])

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'first':
        return <BajarProducto toggle={toggle} />;
      case 'second':
        return <Cobrar toggle={toggle} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
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

export default AgregarEventos;
