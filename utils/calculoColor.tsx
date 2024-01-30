import { ProductoSchema } from "../schemas/productoSchema";

export const calculoColor = (producto: ProductoSchema | null): string => {
    const productoLowerCase = producto?.toLowerCase() || "";
    switch (productoLowerCase) {
        case "papa":
            return "#FF5733"; // Color para 'papa'
        case "ajo":
            return "#DAF7A6"; // Color para 'ajo'
        case "cabutia":
            return "#FFC300"; // Color para 'cabutia'
        case "anco":
            return "#C70039"; // Color para 'anco'
        default:
            return "#000"; // Color por defecto
    }
}