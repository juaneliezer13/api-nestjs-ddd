import { Controller, Get, Request, Body, Param, Delete, Put, HttpException } from '@nestjs/common';
import { ObtenerListaProductosUseCase } from 'src/application/usecases/ObtenerListaProductosUseCase';
import { Producto } from 'src/domain/models/Producto';
import { ObtenerListaProductosRepository } from 'src/infraestructure/adapters/persistency/repositories/ObtenerListaProductosRepository';
import { ProductoDTO } from '../dto/ProductoDTO';
import { ProductoDTOMapper } from '../mappers/ProductoDTOMapper';

@Controller('products')
export class ProductsController {

    obtenerListaProductosUseCase: ObtenerListaProductosUseCase;

    constructor(
        private readonly obtenerListaProductosRepository: ObtenerListaProductosRepository,
    ) {
        this.obtenerListaProductosUseCase = new ObtenerListaProductosUseCase(
            this.obtenerListaProductosRepository
        );
    }

    @Get('list')
    async obtenerListaProductos( @Request() request ): Promise<ProductoDTO[]> {
        const listaProductos : Producto[] = await this.obtenerListaProductosUseCase.execute();
        if (listaProductos) {
            return ProductoDTOMapper.toDTOList(listaProductos);
        }
        new HttpException('No se encontraron productos', 404);
    }
}
