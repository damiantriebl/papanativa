import { createSlice } from '@reduxjs/toolkit';
import { EventoSchema } from '../schemas/eventoSchema';



const initialState: EventoSchema = {};

const EventoSeleccionado = createSlice({
  name: 'EventoSeleccionado',
  initialState,
  reducers: {
    SeleccionarEvento: (state, action) => {
      console.log('bueno tirame el payload', action.payload, state)
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key];
      });
  }, 
  },
});

export const { SeleccionarEvento } = EventoSeleccionado.actions;

export default EventoSeleccionado.reducer;