import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/products.model';
import { ProductCategory } from '../product-category/product-category.model';

@Table
export class Category extends Model {
  @ApiProperty({ example: 134 })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({ example: 'Havic HV G-92 Gamepad' })
  @AllowNull(false)
  @Column
  name: string;

  @ApiHideProperty()
  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
}
