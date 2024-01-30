// store.js
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import clientesReducer from './clientesSlice';
import eventosReducer from './eventoSlice';
import clienteReducer from './clienteSeleccionadoSlice';
import eventoSeleccionadoReducer from './eventoSeleccionadoSlice'; 

const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    eventos: eventosReducer,
    clienteSeleccionado: clienteReducer,
    eventoSeleccionado: eventoSeleccionadoReducer

  },
});


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;