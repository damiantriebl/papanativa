import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface PButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

const PButton: React.FC<PButtonProps> = ({ onPress, title, style }) => {
  const combinedStyles = StyleSheet.flatten([styles.button, style]);
  return (
    <TouchableOpacity onPress={onPress} style={combinedStyles}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PButton;
