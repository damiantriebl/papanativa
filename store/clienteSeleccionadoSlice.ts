import { createSlice } from '@reduxjs/toolkit';
import { ClienteSchema } from '../schemas/clienteSchema';



const initialState: ClienteSchema = {};

const ClienteSeleccionado = createSlice({
  name: 'ClienteSeleccionado',
  initialState,
  reducers: {
    seleccionarCliente: (state, action) => {
        state.id = action.payload.id;
    }, 
  
  },
});

export const { seleccionarCliente } = ClienteSeleccionado.actions;
export default ClienteSeleccionado.reducer;