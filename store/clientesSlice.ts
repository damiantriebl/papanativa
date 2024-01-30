import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  Timestamp, collection, getDocs } from 'firebase/firestore';
import { ClienteSchema } from '../schemas/clienteSchema';
import { db } from '../firebase';


interface ClientesState {
  data: ClienteSchema[];
  loading: boolean;
  error: string | null;
}

export const fetchClientes = createAsyncThunk<ClienteSchema[]>(
  'cliente/fetchClientes',
  async (_, { rejectWithValue }) => {
    try {
      // Supongamos que tus clientes están en una colección llamada 'clientes'
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      let clientes:ClienteSchema[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Supongamos que quieres todo el documento y el ID del documento
        clientes.push({
          ...data,
          id: doc.id,
          nacimiento: data.nacimiento ? (data.nacimiento as Timestamp).toDate().toISOString() : null,
          creado: data.creado ? (data.creado as Timestamp).toDate().toISOString() : null,
          actualizado: data.actualizado ? (data.actualizado as Timestamp).toDate().toISOString() : null,
          
         } as ClienteSchema);
      });
      return clientes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ClientesState = {
  data: [],
  loading: false,
  error: null,
};
const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: {
    // Aquí puedes seguir añadiendo más reducers si es necesario
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.loading = false;
      });
  },
});

export default clienteSlice.reducer;