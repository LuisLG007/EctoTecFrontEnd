export class Localidad {
    
    public idciudad: number;
    public ciudadNombre: string;
    public estadoNombre: string;
    public paisNombre:string;


    constructor(localidad: Object) {
        Object.assign(this, localidad);
    }

    public get LocalidadCompleta(): string{
        return `${ this.ciudadNombre}, ${ this.estadoNombre}, ${ this.paisNombre}`
    }
}
