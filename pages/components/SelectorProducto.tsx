import { View } from "react-native";
import RadioGroup from "./RadioGroup";
import { calculoColor } from "../../utils/calculoColor";
import { ProductoSchema } from "../../schemas/productoSchema";
import { ItemInterface } from "../../schemas/itemInterface";

interface SelectorInterface {
  onChange: (value: ProductoSchema) => {},
  value: string
}
const SelectorProducto = ({ onChange, value }: SelectorInterface) => {
  const options: ItemInterface[] = [
    { label: 'Papa', value: ProductoSchema.Papa, color: calculoColor(ProductoSchema.Papa) },
    { label: 'Ajo', value: ProductoSchema.Ajo, color: calculoColor(ProductoSchema.Ajo) },
    { label: 'Cabutia', value: ProductoSchema.Cabutia, color: calculoColor(ProductoSchema.Cabutia) },
    { label: 'Anco', value: ProductoSchema.Anco, color: calculoColor(ProductoSchema.Anco) },
  ];

  const handleSelect = (data: ProductoSchema) => {
    if (onChange) {
      onChange(data); // Propaga el cambio
    }
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <RadioGroup options={options} onSelect={handleSelect} />
    </View>
  );
};

export default SelectorProducto;