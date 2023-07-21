import { Producto } from "src/domain/models/Producto";
import { ObtenerListaProductosPort } from "src/application/ports/ObtenerListaProductosPort";
import { ProductoEntity } from "../entities/ProductoEntity";
import { ProductoMapper } from "../entityMappers/ProductoMapper";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ObtenerListaProductosRepository implements ObtenerListaProductosPort {
    @Inject('ProductoDB')
    private readonly productoEntity: typeof ProductoEntity;
    constructor() { }
    async execute(): Promise<Producto[]> {
        
        try {
            const productosQuery = await this.productoEntity.findAll();
            return ProductoMapper.toDomainList(productosQuery);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

