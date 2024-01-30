import { NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
    Home: undefined;
    Eventos: { clienteId: string };
    // Agrega aquí otras rutas con sus respectivos parámetros
  };
// El tipo de navigation para la pantalla Home
export type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

// El tipo de navigation para la pantalla Details
export type DetailsScreenNavigationProp = NavigationProp<RootStackParamList, 'Eventos'>;
