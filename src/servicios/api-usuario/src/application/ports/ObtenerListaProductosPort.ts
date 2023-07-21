import { Producto } from "src/domain/models/Producto";

export interface ObtenerListaProductosPort {
    execute(): Promise<Producto[]>;
}

