// Objetivo: Mapear los datos de la entidad Producto a un DTO (Objeto de transferencia de datos)
import { Producto } from 'src/domain/models/Producto';
import { ProductoDTO } from '../dto/ProductoDTO';
export class ProductoDTOMapper { 
    static toDTO(domain: Producto): ProductoDTO {
        const dto = new ProductoDTO(
            domain.id,
            domain.nombre,
            domain.precio,
            domain.cantidad
        );
        return dto;
    }
    
    static toDTOList(domains: Producto[]): ProductoDTO[] {
        const dtos: ProductoDTO[] = [];
        domains.forEach(domain => {
            dtos.push(this.toDTO(domain));
        });
        return dtos;
    }
}
