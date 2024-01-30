import { EventoSchema } from './eventoSchema';

export interface ClienteSchema {
    id: string;
    debe: number;
    nombre: string;
    direccion: string;
    nacimiento: Date | null;
    creado: Date | null;
    actualizado: Date | null;
    eventos: EventoSchema | null;
    notas: string;
  }