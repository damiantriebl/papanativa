import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ColorSchemeName } from 'react-native';
import { ProductoSchema } from '../../schemas/productoSchema';
import { ItemInterface } from '../../schemas/itemInterface';



interface RadioGroupProps {
  options: ItemInterface[];
  onSelect?: (value: ProductoSchema) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<ProductoSchema | null>(null);

  const handlePress = (value: ProductoSchema) => {
    setSelectedValue(value);
    if (onSelect) {
      onSelect(value);
    }
  };
  const renderItem = ({ item }: { item: ItemInterface }) => (
    <TouchableOpacity
      key={item.value}
      style={styles.optionContainer}
      onPress={() => handlePress(item.value)}
      accessible
      accessibilityRole="radio"
      accessibilityState={{ selected: selectedValue === item.value }}
    >
      <View style={[styles.circle, selectedValue === item.value ? styles.selectedCircle : null, { borderColor: item.color }]}>
        {selectedValue === item.value && <View style={[styles.filledCircle, { backgroundColor: item.color }]} />}
      </View>
      <Text style={styles.optionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
      keyExtractor={item => item.value}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 10
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 10,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    borderColor: 'blue',
  },
  filledCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default RadioGroup;
