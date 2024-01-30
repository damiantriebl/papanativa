import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Eventos from './pages/eventos';
import store from './store/store';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Clientes'}}
          />
          <Stack.Screen name="Eventos" component={Eventos} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

