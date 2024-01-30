import React, { useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { EventoSchema, FormEventoSchema } from '../../schemas/eventoSchema';
import PButton from './PButton';
import { RootState } from '../../store/store';
import { addEvento } from '../../store/eventoSlice';

export const Cobrar = ({ toggle }) => {
  const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormEventoSchema>();
  const dispatch = useDispatch();
  const clientes = useSelector((state: RootState) => state.clientes.data);
  const clienteId = useSelector((state: RootState) => state.clienteSeleccionado.id);
  const clienteSeleccionado = clientes.find((cli) => cli.id == clienteId);
  const EventoSeleccionado = useSelector((state: any) => state.eventoSeleccionado);

  const entrego = watch("entrego");

  useEffect(() => {
    if (EventoSeleccionado && EventoSeleccionado?.tipo === 'cobrar') {
      if (clienteSeleccionado?.id !== undefined) {
        setValue("idCliente", clienteSeleccionado.id);
      }
      setValue("creado", EventoSeleccionado.creado);
      setValue("actualizado", EventoSeleccionado.actualizado);
      setValue("entrego", EventoSeleccionado.entrego);
      setValue("notas", EventoSeleccionado.notas);
      setValue("tipo", 'cobrar');
      setValue("editado", true);
      setValue("id", EventoSeleccionado.id);
    }
  }, [EventoSeleccionado])

  useEffect(() => {
    if (clienteSeleccionado?.id !== undefined) {
      setValue("idCliente", clienteSeleccionado.id);
      setValue("tipo", 'cobrar');
    }
  }, [clienteSeleccionado, setValue]);

  const onSubmit = (data: EventoSchema) => {
    dispatch(addEvento(data))
    toggle();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{clienteSeleccionado?.nombre}</Text>
        <Text style={styles.totalText}>
          Total: ${clienteSeleccionado?.debe.toLocaleString('es-AR')}
        </Text>

      </View>
      {errors.producto && <Text style={styles.error}>Este campo es requerido.</Text>}
      <View style={styles.medioRow}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Monto De Entrega"
              keyboardType='numeric'
              value={entrego}
            />
          )}
          name="entrego"
          rules={{ required: true, }}
          defaultValue={0}
        />
        {errors.entrego && <Text style={styles.error}>Este campo es requerido.</Text>}

      </View>
      <Controller
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Notas"
            multiline={true}
          />
        )}
        name="notas"
      />
      <View style={styles.row}>
        <PButton style={styles.buttonGrow} title="Agregar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  totalText: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

