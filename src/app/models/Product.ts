export class Product{
    _id: number;
    marca: string;
    modelo:string;
    serie:string;
    tension: number;
    proveedor: string;
    ubicacion: string;
    propietario: string;
    enContrato: boolean;

    constructor(){
        this._id=0;
        this.marca='';
        this.modelo='';
        this.serie='';
        this.tension=0;
        this.proveedor='';
        this.ubicacion='';
        this.propietario='';
        this.enContrato=false;

    }

}

export const marcas = ['Lexmark','Oki', 'Toshiba'];