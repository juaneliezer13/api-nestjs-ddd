
export class ProductoDTO {
    readonly id: string;
    readonly nombre: string;
    readonly precio: number;
    readonly cantidad: number;

    constructor(
        id: string, 
        nombre: string, 
        precio: number, 
        cantidad: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}