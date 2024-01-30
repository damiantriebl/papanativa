import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { EventoSchema, FormEventoSchema } from '../../schemas/eventoSchema';
import SelectorProducto from './SelectorProducto';
import PButton from './PButton';
import { useSelector, useDispatch } from 'react-redux';
import { addEvento, agregarEvento } from '../../store/eventoSlice';
import { RootState } from '../../store/store';


export const BajarProducto = ({ toggle }) => {
  const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormEventoSchema>();
  const [subtotal, setTotal] = useState(0);
  const dispatch = useDispatch();
  const clientes = useSelector((state: RootState) => state.clientes.data);
  const clienteId = useSelector((state: RootState) => state.clienteSeleccionado.id);
  const clienteSeleccionado = clientes.find((cli) => cli.id == clienteId);
  const EventoSeleccionado = useSelector((state: any) => state.eventoSeleccionado);

  const cantidad = watch("cantidad");
  const precioUnitario = watch("precioUnitario");
  useEffect(() => {
    if (EventoSeleccionado && EventoSeleccionado?.tipo === 'bajar') {
      setValue("idCliente", clienteSeleccionado.id);
      setValue("creado", EventoSeleccionado.creado);
      setValue("actualizado", EventoSeleccionado.actualizado);
      setValue("producto", EventoSeleccionado.producto);
      setValue("cantidad", EventoSeleccionado.cantidad);
      setValue("precioUnitario", EventoSeleccionado.precioUnitario);
      setValue("subtotal", EventoSeleccionado.subtotal);
      setValue("notas", EventoSeleccionado.notas);
      setValue("tipo", 'bajar');
      setValue("editado", true);
      setValue("id", EventoSeleccionado.id);
    }
  }, [EventoSeleccionado])
  useEffect(() => {
    if (cantidad && precioUnitario) {
      const newTotal = Number(cantidad) * Number(precioUnitario);
      setTotal(newTotal);
      setValue("subtotal", newTotal, { shouldValidate: true });

    }
  }, [cantidad, precioUnitario]);
  useEffect(() => {
    if (clienteSeleccionado.id) {
      setValue("idCliente", clienteSeleccionado.id);
      setValue("tipo", 'bajar');
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
        <Text>{clienteSeleccionado.nombre}</Text>
        <Text style={styles.totalText}>
          Total: ${clienteSeleccionado.debe.toLocaleString('es-AR')}
        </Text>

      </View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectorProducto
            onChange={onChange}
            value={value}
          />
        )}
        name="producto"
        rules={{ required: true }}
      />
      {errors.producto && <Text style={styles.error}>Este campo es requerido.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChange={onChange}
            style={{ height: 0, width: 0, opacity: 0 }} // Hace el TextInput invisible
            value={subtotal.toString()}
          />
        )}
        name="subtotal"
        defaultValue=""
      />
      <View style={styles.medioRow}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Cantidad"
            />
          )}
          name="cantidad"
          rules={{ required: true }}
          defaultValue={0}
        />
        {errors.cantidad && <Text style={styles.error}>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Precio Unitario"
              keyboardType="numeric"
            />
          )}
          name="precioUnitario"
        />
        {errors.precioUnitario && <Text style={styles.error}>Este campo es requerido.</Text>}
      </View>
      {subtotal > 0 && (
        <Text style={styles.totalText}>
          Total: ${subtotal.toLocaleString('es-AR')}
        </Text>
      )}

      <Controller
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Notas"
          />
        )}
        name="notas"
      />
      <View style={styles.row}>
        <PButton style={styles.buttonGrow} title="Agregar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

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

