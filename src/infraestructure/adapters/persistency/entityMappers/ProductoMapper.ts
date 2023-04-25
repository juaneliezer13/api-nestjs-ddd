import { Producto } from 'src/domain/models/Producto';
import { ProductoEntity } from '../entities/ProductoEntity';

export class ProductoMapper {

    static toDomain(entity: ProductoEntity): Producto {
        const domain = new Producto();
        domain.id = entity.id;
        domain.nombre = entity.nombre;
        domain.precio = entity.precio;
        domain.cantidad = entity.cantidad;
        return domain;
    }

    static toDomainList(entities: ProductoEntity[]): Producto[] {
        const domains: Producto[] = [];
        entities.forEach(entity => {
            domains.push(this.toDomain(entity));
        });
        return domains;
    }

    static toEntity(domain: Producto): ProductoEntity {
        const entity = new ProductoEntity();
        entity.id = domain.id;
        entity.nombre = domain.nombre;
        entity.precio = domain.precio;
        entity.cantidad = domain.cantidad;
        return entity;
    }
}