import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { EventoSchema, FormEventoSchema } from '../schemas/eventoSchema';
import { runTransaction,  Timestamp, collection,addDoc,updateDoc, doc, orderBy , getDocs, query } from 'firebase/firestore';
import { fetchClientes } from './clientesSlice';


// Estado para el slice de eventos
export interface EventosState {
    eventosPorCliente: Record<string, EventoSchema[]>; // Mapa de idCliente a eventos
    loading: boolean;
    error: string | null;
  }

  const initialState: EventosState = {
    eventosPorCliente: {},
    loading: false,
    error: null,
  };
  export const addEvento = createAsyncThunk(
    'eventos/addEvento',
    async (data: FormEventoSchema, { dispatch, rejectWithValue, getState  }) => {
      try {
        const eventoRef = collection(db, 'clientes', data.idCliente, 'eventos');
  
        let resultado;
        if (data.editado && data.id) {
          await runTransaction(db, async (transaction) => {
            const clienteDocRef = doc(db, 'clientes', data.idCliente);
            const eventoDocRef = doc(db, 'clientes', data.idCliente, 'eventos', data.id);
  
            const clienteDoc = await transaction.get(clienteDocRef);
            if (!clienteDoc.exists()) {
              throw new Error("Cliente no encontrado");
            }
  
            const nuevoDebe = clienteDoc.data().debe + data.subtotal -  getState().eventoSeleccionado.subtotal;
            transaction.update(clienteDocRef, { debe: nuevoDebe });
  
            const dataActualizada = {
              ...data,
              subtotal: +data.subtotal,
              cantidad: +data.cantidad,            
              debeAFecha: +data.debeAFecha,
              precioUnitario: +data.precioUnitario,             
              entrego: +data.entrego,
              creado: Timestamp.fromMillis(data.creado),
              actualizado: Timestamp.now(),
            };
            transaction.update(eventoDocRef, dataActualizada);  
            resultado = data.id;
          });
        } else {
          await runTransaction(db, async (transaction) => {
            const clienteDocRef = doc(db, 'clientes', data.idCliente);
            const clienteDoc = await transaction.get(clienteDocRef);
            if (!clienteDoc.exists()) {
              throw new Error("Cliente no encontrado");
            }
            let nuevoDebe
            if(data.tipo === 'bajar'){
              nuevoDebe = clienteDoc.data().debe + data?.subtotal
            }else {              
              nuevoDebe = clienteDoc.data().debe - data?.entrego
            }
            transaction.update(clienteDocRef, { debe: nuevoDebe });
        
            // Crear una referencia para un nuevo documento en la colección de eventos
            const nuevoEventoRef = doc(eventoRef);
        
            // Ahora usar transaction.set para establecer los datos en el nuevo documento
            transaction.set(nuevoEventoRef, {
              ...data,
              subtotal: +data.subtotal,
              cantidad: +data.cantidad,            
              debeAFecha: +data.debeAFecha,
              precioUnitario: +data.precioUnitario,             
              entrego: +data.entrego,
              creado: Timestamp.now(),
              actualizado: Timestamp.now(),
            });
        
            // Guardar el ID del nuevo documento creado
            resultado = nuevoEventoRef.id;
          });
        }
  
        dispatch(fetchEventosPorCliente({ idCliente: data.idCliente, forzarLlamada: true }));
        dispatch(fetchClientes());

        return resultado;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const fetchEventosPorCliente = createAsyncThunk(
    'eventos/fetchPorCliente',
    async ({ idCliente, forzarLlamada = false }: { idCliente: string; forzarLlamada?: boolean }, { getState }) => {
      const state = getState() as { eventos: EventosState };
  
      // Verificar si los eventos del cliente ya están cargados
      if (state.eventos?.eventosPorCliente[idCliente] &&  !forzarLlamada) {
        return null; // Los eventos ya están cargados, no es necesario hacer nada
      }
  
      // Cargar los eventos del cliente desde Firestore
      const eventosRef = collection(db, 'clientes', idCliente, 'eventos');
      const q = query(eventosRef, orderBy('creado', 'desc'));
      const querySnapshot = await getDocs(q);
  
      let eventos:EventoSchema[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        eventos.push({
          idCliente: idCliente, 
          cantidad: data.cantidad || 0,
          cero: data.cero || null,
          creado: data.creado ? (data.creado as Timestamp).toDate().getTime() : 0,
          actualizado: data.actualizado ? (data.actualizado as Timestamp).toDate().getTime() : 0,
          debeAFecha: data.debeAFecha || 0,
          id: doc.id,
          entrego: data.entrego,
          notas: data.notas || null,
          precioUnitario: data.precioUnitario || 0,
          producto: data.producto || '',
          subtotal: data.subtotal || 0,
          tipo: data.tipo || '',
        });
      });
      return { idCliente, eventos };
    }
  );
  // Crear el slice
const eventosSlice = createSlice({
    name: 'eventos',
    initialState,
    reducers: {
      agregarEvento: (state, action) => {
        state.eventosPorCliente[action.payload.idCliente] = [action.payload,...state.eventosPorCliente[action.payload.idCliente]];
      },  
      agregar0: (state, action) => {
        const { tipo, index, clienteId } = action.payload;
        const eventosCliente = state.eventosPorCliente[clienteId];
        
        // Verificar si eventosCliente existe
        if (eventosCliente) {
          // Crear una nueva copia del array con el elemento insertado
          state.eventosPorCliente[clienteId] = [
            ...eventosCliente.slice(0, index),
            { tipo },
            ...eventosCliente.slice(index),
          ];
        }
      },
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchEventosPorCliente.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchEventosPorCliente.fulfilled, (state, action: PayloadAction<{ idCliente: string, eventos: EventoSchema[] } | null>) => {
          if (action.payload) {
            const { idCliente, eventos } = action.payload;
            state.eventosPorCliente[idCliente] = eventos;
          }
          state.loading = false;
        })
        .addCase(fetchEventosPorCliente.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Error desconocido';
        })     
    },
     
  });
  export const { agregarEvento, agregar0 } = eventosSlice.actions;
  export default eventosSlice.reducer;