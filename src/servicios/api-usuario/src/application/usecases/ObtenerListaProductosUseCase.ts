// Escribe una clase de caso de uso que implemente la interfaz ObtenerListaProductosPort y que obtenga la lista de productos de la base de datos.

import { Producto } from 'src/domain/models/Producto';
import { ObtenerListaProductosPort } from '../ports/ObtenerListaProductosPort';

export class ObtenerListaProductosUseCase implements ObtenerListaProductosPort {
    constructor(
        private readonly obtenerListaProductosPort: ObtenerListaProductosPort
    ) { }
    async execute(): Promise<Producto[]> {
        const listaProductos : Producto[] = await this.obtenerListaProductosPort.execute();
        return listaProductos;
    }
}