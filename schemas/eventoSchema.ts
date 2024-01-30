import { ProductoSchema } from "./productoSchema";

export interface EventoSchema {
  idCliente: string;
  cantidad: number;
  cero: null;
  creado: Date;
  actualizado: Date;
  debeAFecha: number;
  notas: null;
  precioUnitario: number;
  producto: ProductoSchema;
  subtotal: number;
  entrego: number;
  tipo: string;
}

export interface FormEventoSchema extends EventoSchema {
  id: string | null; 
  editado: boolean;
}
