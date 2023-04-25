import { ProductoEntity } from "./adapters/persistency/entities/ProductoEntity";
import { ObtenerListaProductosRepository } from "./adapters/persistency/repositories/ObtenerListaProductosRepository";
import { ProductsController } from "./presentation/controllers/ProductsController";

const repositories = [
  ObtenerListaProductosRepository
];
const entities = [
  {
    provide: 'ProductoDB',
    useValue: ProductoEntity,
  },
];
const services = [];
const controllers = [
  ProductsController
];

export class Config {

  static getRepositories(): any[] {
    return repositories;
  }

  static getEntities(): any[] {
    return entities;
  }

  static getServices(): any[] {
    return services;
  }

  static getControllers(): any[] {
    return controllers;
  }
}
