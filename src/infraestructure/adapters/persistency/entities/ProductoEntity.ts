import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: "producto" })
export class ProductoEntity extends Model<ProductoEntity> {

  @PrimaryKey
  @Column({field: 'id' })
  id: string;

  @Column({field: 'rut' })
  nombre: string;

  @Column({field: 'precio' })
  precio: number;

  @Column({field: 'cantidad' })
  cantidad: number;
}