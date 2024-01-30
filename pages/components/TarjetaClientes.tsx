import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { EventoSchema } from '../../schemas/eventoSchema';
import { ClienteSchema } from '../../schemas/clienteSchema';

interface PButtonProps {
    title: string;
    onPress: () => void;
}

interface TarjetaClienteProps {
    index: number;
    cliente: ClienteSchema;
    handleEditar: (item: ClienteSchema) => void;
}

const PButton: React.FC<PButtonProps> = ({ title, onPress }) => (
    <button onClick={onPress}>{title}</button>
);

const TarjetaCliente: React.FC<TarjetaClienteProps> = ({ cliente, index, handleEditar }) => {
    let cardStyle: StyleProp<ViewStyle>;
    let titleText: string;

    return (
        <View key={index} style={{ ...styles.card }}>
            <Text style={styles.title}>{cliente.nombre}</Text>
            <View style={styles.details}>
                <Text>{cliente.debe}</Text>
            </View>
            <PButton title="editar" onPress={() => handleEditar(cliente)} />

        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#FCC487',
    },
    card: {
        backgroundColor: '#FCC487',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 15,
        shadowColor: '#000',
        width: "90%"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dueDate: {
        fontSize: 16,
        color: 'grey',
    },
});

export default TarjetaCliente;
