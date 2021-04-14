export interface LocalidadResponse {
    bandera: boolean;
    mensaje: null;
    datos:   Localidad[];
}

interface Localidad {
    idciudad:     number;
    ciudadNombre: string;
    estadoNombre: string;
    paisNombre:   string;
}
